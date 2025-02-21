import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-modal";
import NavBar from "../NavBar";
import Footer from "../Footer";

Modal.setAppElement("#root"); // Set modal root to avoid accessibility warnings

export default function MyBlogBlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/user/blog/my-posts/${id}`, { withCredentials: true });
        const { title, category, description, image_url } = res.data;
        setTitle(title);
        setCategory(category);
        setDescription(description);
        setImage(image_url);
      } catch (error) {
        toast.error("Failed to fetch blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const uploadImage = async () => {
    if (!file) return image;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dktio4phw/image/upload", formData, { withCredentials: true });
      return response.data.secure_url;
    } catch (error) {
      toast.error("Image upload failed");
      return image;
    }
  };

  const handleUpdate = async () => {
    try {
      setSaveLoading(true);
      const imageUrl = await uploadImage();

      await axios.put(
        `http://localhost:5001/api/user/blog/update/${id}`,
        { title, category, description, image: imageUrl },
        { withCredentials: true }
      );

      toast.success("Blog updated successfully!");
    } catch (error) {
      toast.error("Failed to update blog");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(`http://localhost:5001/api/user/blog/delete/${id}`, { withCredentials: true });
      toast.success("Blog deleted successfully!");
      navigate("/my-posts");
    } catch (error) {
      toast.error("Failed to delete blog");
    } finally {
      setDeleteLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden p-8 mt-10">
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <ClipLoader size={50} color="#1DCEF5" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden w-full h-80">
              <label htmlFor="imageUpload" className="cursor-pointer absolute inset-0">
                <img src={image} alt="Blog" className="w-full h-full object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 hover:opacity-100 transition">
                  <FaPlus className="text-3xl" />
                  <span className="text-lg mt-2">Change Image</span>
                </div>
              </label>
              <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 text-sm font-semibold">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                >
                  <option value="Food">Food</option>
                  <option value="Tech">Tech</option>
                  <option value="News">News</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                  disabled={saveLoading}
                >
                  {saveLoading ? <ClipLoader size={20} color="white" /> : "Save"}
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition flex items-center justify-center"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this blog post?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-gray-400 rounded-md">Cancel</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md">
            {deleteLoading ? <ClipLoader size={20} color="white" /> : "Delete"}
          </button>
        </div>
      </Modal>

      <Footer />
    </> 
  );
}

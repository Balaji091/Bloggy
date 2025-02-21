import { useState } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function AddPost() {
  const navigate=useNavigate()
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Tech",
    description: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("category", formData.category);
    formDataObj.append("description", formData.description);

    if (image) {
      formDataObj.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5001/api/user/blog/add", {
        method: "POST",
        body: formDataObj,
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Post uploaded successfully!");
        navigate('/my-posts')
      } else {
        toast.error(data.message || "Failed to upload post.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <NavBar />
      <ToastContainer />
      <div className="flex flex-col items-center px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create a New Post</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg p-6 flex flex-col gap-4 shadow-md">
          <div className="w-full space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Intern selection process"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Food">Food</option>
                <option value="Tech">Tech</option>
                <option value="News">News</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Describe the selection process"
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700 mb-2">Upload Image</label>
            <label
              htmlFor="imageUpload"
              className="w-full h-36 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition relative"
            >
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                id="imageUpload"
                onChange={handleImageChange}
              />
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="flex flex-col items-center">
                  <FaCloudUploadAlt className="text-gray-400 text-4xl mb-2" />
                  <span className="text-gray-400 text-sm">Click to upload</span>
                </div>
              )}
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Upload Post"
            )}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

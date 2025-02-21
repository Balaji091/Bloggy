import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import BlogCard from "../BlogCard";
import NavBar from "../NavBar";
import Footer from "../Footer";

export default function BlogSection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/api/home/posts/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch blog details");
        return response.json();
      })
      .then((data) => {
        setBlogData(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );

  return (
    <>
      <NavBar />
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Main Blog */}
        {blogData?.post && <BlogCardDetails blog={blogData.post} />}

        {/* Similar Blogs */}
        {blogData?.similarPosts.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mt-8">Similar Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blogData.similarPosts.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

// BlogCardDetails Component
function BlogCardDetails({ blog }) {
  const { image_url, title, category, description } = blog;
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked(!liked);

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
      {/* Image */}
      <div className="w-full md:w-2/5 h-60 md:h-[60vh]">
        <img src={image_url} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">Category: {category}</p>
          <p className="text-gray-600 mt-3 text-base">{description}</p>
        </div>

        {/* Like & Share Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button onClick={toggleLike} className="focus:outline-none">
            {liked ? (
              <FaHeart className="text-red-500 text-2xl" />
            ) : (
              <FaRegHeart className="text-gray-500 text-2xl" />
            )}
          </button>
          <button className="text-gray-500 text-2xl hover:text-blue-500">
            <FaShareAlt />
          </button>
        </div>
      </div>
    </div>
  );
}     
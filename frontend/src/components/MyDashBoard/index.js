import { FaPlus } from "react-icons/fa6";

import { useState, useEffect } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import MyBlogCard from "../MyBlogCard";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogPosts();
  }, [activeTab]);

  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5001/api/user/blog/my-posts", {
        withCredentials: true,
      });
      setBlogPosts(response.data);
    } catch (error) {
      toast.error("Failed to fetch posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = ["All", "Tech", "Food",  "News"];

  const filteredPosts =
    activeTab === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeTab);

  return (
    <div className="bg-base-800">
      <NavBar />
      <div className="px-6 py-8 max-w-7xl mx-auto min-h-svh">
        <ToastContainer position="top-right" autoClose={3000} />
        {/* Top Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">My Posts</h1>
          <button
            className="flex items-center gap-2 bg-[#1DCEF5] text-white rounded-lg px-4 py-2 hover:bg-[#1AB9E0] transition-all duration-300"
            onClick={() => {
              navigate("/add-post");
            }}
          >
            <FaPlus className="text-sm" />
            <span className="text-sm">Add Post</span>
          </button>
        </div>

        {/* Tabs Section */}
        <div className="mb-8">
          <ul className="flex gap-4 border-b border-gray-200">
            {tabs.map((tab, index) => (
              <li
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300 
                ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Blog Cards Grid with Loader */}
        {loading ? (
          <div className="flex justify-center items-center min-h-40">
            <ClipLoader size={50} color="#1DCEF5" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((blog, index) => <MyBlogCard key={index} blog={blog} />)
            ) : (
              <p className="text-gray-500 text-center col-span-full">No posts available</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

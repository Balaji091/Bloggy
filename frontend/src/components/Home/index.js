import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"; // Import spinner
import BlogCard from "../BlogCard";
import NavBar from "../NavBar";
import Footer from "../Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = ["All", "Tech", "Food", "News"];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5001/api/home/posts");
      setBlogPosts(response.data);
    } catch (error) {
      toast.error("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = async (category) => {
    setActiveTab(category);
    setLoading(true);
    try {
      const url =
        category === "All"
          ? "http://localhost:5001/api/home/posts"
          : `http://localhost:5001/api/home/filter?category=${category}`;
      const response = await axios.get(url);
      setBlogPosts(response.data);
    } catch (error) {
      toast.error("Failed to filter posts.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-800">
      <NavBar setBlogPosts={setBlogPosts} />
      <div className="px-6 py-8 max-w-7xl mx-auto min-h-svh">
        {/* Tabs Section */}
        <div className="mb-8">
          <ul className="flex gap-4 border-b border-gray-200">
            {tabs.map((tab, index) => (
              <li
                key={index}
                onClick={() => filterPosts(tab)}
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300 
                ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ClipLoader color="#3B82F6" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.length > 0 ? (
              blogPosts.map((blog, index) => <BlogCard key={index} blog={blog} />)
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

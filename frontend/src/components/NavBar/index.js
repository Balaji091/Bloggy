import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCircleUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { ClipLoader } from "react-spinners";

export default function NavBar({ setBlogPosts }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5001/api/home/filter?title=${searchTerm}`
      );
      setSearchResults(response.data);
      setBlogPosts(response.data);
    } catch (error) {
      toast.error("Search failed. Try again.");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5001/api/user/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Try again.");
    }
  };
      

  return (
    <div className="w-screen pr-5 h-[60px] flex items-center px-10 justify-between shadow-md text-gray-800 bg-white">
      <div className="text-xl font-bold cursor-pointer">
        <Link to="/">Bloggy</Link>
      </div>
      <div className="flex items-center gap-6">
        <div
          className="text-2xl cursor-pointer hover:text-blue-500"
          onClick={() => setShowSearchModal(true)}
        >
          <CiSearch />
        </div>
        <div
          className="text-2xl cursor-pointer hover:text-blue-500 relative"
          onClick={() => setShowPopup(!showPopup)}
        >
          <FaCircleUser />
          {showPopup && (
            <div className="absolute right-0 bg-white top-12 rounded shadow-lg flex flex-col w-48 py-3 z-20 border border-blue-500">
              <Link to="/my-posts" className="flex items-center gap-3 text-blue-500 cursor-pointer hover:bg-gray-100 py-2 px-4">
                <MdSpaceDashboard />
                <h1 className="text-sm">My Posts</h1>
              </Link>
              <Link to="/register" className="flex items-center gap-3 text-blue-500 cursor-pointer hover:bg-gray-100 py-2 px-4">
                <IoIosAddCircle />
                <h1 className="text-sm">Register</h1>
              </Link>
              <Link to="/login" className="flex items-center gap-3 text-blue-500 cursor-pointer hover:bg-gray-100 py-2 px-4">
                <CiLogin />
                <h1 className="text-sm">Login</h1>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-blue-500 cursor-pointer hover:bg-gray-100 py-2 px-4 w-full text-left"
              >
                <IoLogOutOutline />
                <h1 className="text-sm">Logout</h1>
              </button>
            </div>
          )}
        </div>
      </div>
      {showSearchModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-96 rounded-lg shadow-lg p-5 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowSearchModal(false)}
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-3">Search Blogs</h2>
            <input
              type="text"
              placeholder="Enter blog title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2 flex justify-center items-center gap-2"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? <ClipLoader size={15} color="white" /> : "Search"}
            </button>
            <div className="mt-4 max-h-60 overflow-y-auto">
              {loading ? (
                <p className="text-gray-500 text-sm mt-2">Searching...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((post) => (
                  <p
                    key={post.id}
                    className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/posts/${post.id}`)}
                  >
                    {post.title}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 text-sm mt-2">No results found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

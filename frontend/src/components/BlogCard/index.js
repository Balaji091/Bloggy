import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaClock } from "react-icons/fa"; // Import icons

export default function BlogCard({ blog }) {
  const { id, image_url, title, category, user_email, created_at } = blog;
  const [timeAgo, setTimeAgo] = useState("");
  const navigate = useNavigate(); // React Router navigation

  // Function to format time as "x days ago"
  useEffect(() => {
    const getTimeAgo = (date) => {
      const seconds = Math.floor((new Date() - new Date(date)) / 1000);
      const intervals = { year: 31536000, month: 2592000, week: 604800, day: 86400, hour: 3600, minute: 60 };

      for (let [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(seconds / value);
        if (count > 0) return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
      }
      return "Just now";
    };

    setTimeAgo(getTimeAgo(created_at));
  }, [created_at]);

  return (
    <div
      onClick={() => navigate(`/posts/${id}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <img src={image_url} alt={title} className="w-full h-40 object-cover" />

      {/* Content */}
      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        <span className="text-sm text-gray-500 mt-1">Category: {category}</span>

        {/* User & Time Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
          {/* User Info */}
          <div className="flex items-center space-x-1">
            <FaUser className="text-blue-500" />
            <span className="font-medium">{user_email}</span>
          </div>

          {/* Time Info */}
          <div className="flex items-center space-x-1">
            <FaClock className="text-gray-500" />
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

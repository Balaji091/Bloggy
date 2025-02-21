import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both fields!", { position: "top-right", autoClose: 3000 });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/auth/login",
        { email, password },
        { withCredentials: true } // ✅ Allow cookies
      );
      
      toast.success("Login Successful! Redirecting...", { position: "top-right", autoClose: 3000 });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.", { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <ClipLoader color="#3B82F6" size={50} />
        </div>
      )}
      
      {/* Image Section */}
      <div className="w-full lg:w-1/2 bg-white flex justify-center items-center p-4">
        <img
          src="/login_avatar.avif"
          alt="Login Avatar"
          className="w-3/4 h-auto object-contain lg:w-full lg:h-full"
        />
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl text-left  font-bold text-blue-600 mb-4"> Bloggy Login</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 pb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 w-full rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:text-red-500"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;

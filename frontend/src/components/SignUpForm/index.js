import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "", // ✅ Match with backend
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Updated validation functions
  const validatePhoneNumber = (phone_number) => /^\d{10}$/.test(phone_number);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone_number, password } = formData;

    if (!name || !email || !phone_number || !password) {
      toast.error("All fields are required.");
      return;
    }
    if (!validatePhoneNumber(phone_number)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters, including uppercase, lowercase, number, and special character."
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/user/auth/signup", formData, {
        withCredentials: true, // ✅ Allows setting cookies for JWT
      });

      toast.success(response.data.message || "Signup successful!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row bg-gray-100 relative ${loading ? 'blur-sm' : ''}`}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <ClipLoader color="#2563eb" size={50} />
        </div>
      )}

      <div className="md:w-1/2 flex justify-center items-center bg-white">
        <img src="/login_avatar.avif" alt="Signup Avatar" className="w-2/3 h-auto object-contain" />
      </div>

      <div className="flex flex-col md:w-1/2 justify-center items-center py-10 px-6 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {["name", "email", "phone_number", "password"].map((id) => (
            <div key={id} className="mb-4">
              <input
                id={id}
                type={id === "password" ? "password" : "text"}
                value={formData[id]}
                onChange={handleChange}
                placeholder={id.charAt(0).toUpperCase() + id.slice(1).replace("_", " ")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition duration-200"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account? 
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;

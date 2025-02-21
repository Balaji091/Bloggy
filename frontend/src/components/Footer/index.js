import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold text-white">About This Blog</h2>
          <p className="mt-3 text-sm">
            A platform to share insights, tutorials, and the latest trends in web development.
            Stay updated with cutting-edge technologies and best practices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-white">Quick Links</h2>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-xl font-semibold text-white">Follow Us</h2>
          <div className="flex mt-3 space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl"><FaLinkedin /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} BlogApp. All rights reserved.
      </div>
    </footer>
  );
}

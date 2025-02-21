import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
import BlogCardDetails from "./components/BlogCardDetails";
import MyBlogDetails from "./components/MyBlogDetails";
import SignUp from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import MyDashBoard from "./components/MyDashBoard";
import ProtectedRoute from "./components/ProtectionRoute";

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/posts/:id" element={<BlogCardDetails />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/my-posts" element={<MyDashBoard />} />
            <Route path="/my-posts/:id" element={<MyBlogDetails />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;

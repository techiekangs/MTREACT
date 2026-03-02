import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../../API/api.js";
import { userLogin } from "../../../API/ContentManagement/CM_Repository";
import Modal from "../../../Components/Common/Modal";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalVariant, setModalVariant] = useState('default');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await userLogin(username, password);
      console.log(response);
      const userData = response;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", response.token);
         setModalTitle("Success");
      setModalContent("Login success! 🌸");
      setModalVariant("success");
      setModalOpen(true);
    } catch (error) {
      setModalTitle("Error");
      setModalContent(`${error.message}`);
      setModalVariant("error");
      setModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
       <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          // Reload page with parameters only on success
          if (modalVariant === "success") {
            window.location.href = "/ContentManagement/Dashboard";
          }
        }}
        title={modalTitle}
        content={modalContent}
        variant={modalVariant}
        size="md"
      />
      <h2 className="text-2xl font-semibold text-violet-700 text-center mb-6">
        Log In Your Account
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Username</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
            <User className="text-gray-500 mr-2" size={18} />
            <input
              type="text"
              placeholder="Enter username"
              className="flex-1 outline-none text-gray-800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Password</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
            <Lock className="text-gray-500 mr-2" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="flex-1 outline-none text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="ml-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm mb-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-violet-600" />
            <span className="text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-violet-600 hover:underline">
            Forgot your password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-violet-700 hover:bg-violet-800 text-white py-2 rounded-lg shadow-md transition"
        >
          LOG IN
        </button>

        {/* Create Account */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account yet?{" "}
          <Link
            to="/ContentManagement/Register"
            className="text-violet-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}

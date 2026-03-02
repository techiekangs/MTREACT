import { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import api from "../../../API/api.js";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);
    console.log("Sending login with:", username, password);
    try {
      const response = await api.post(
        "/Users/Detail/Add?EmployeeNumber=",
        {
          EmailAddress: formData.emailAddress,
          ContactNumber: formData.contactNumber
        },
        {
          headers: {
            "Authorization": "bearer",
            "IpAddress": "::1",
            "AppName": "MT",
          },
        }
      );

      console.log("Login success:", response.data);
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      // Example: save token
      localStorage.setItem("token", response.data.token);

      // Redirect
      window.location.href = "#/ContentManagement/Dashboard";
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password ❌");
    }

  };


  return (
    <div>
      <h2 className="text-2xl font-semibold text-violet-700 text-center mb-6">
        Log In Your Account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Contact Number</label>
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
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email Address</label>
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
        <div className="mb-4">
          <label className="text-sm text-gray-600">Confirm Password</label>
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
        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-violet-700 hover:bg-violet-800 text-white py-2 rounded-lg shadow-md transition"
        >
          Verify
        </button>

        {/* Log in */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/ContentManagement/Login"
            className="text-violet-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

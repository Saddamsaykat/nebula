import React, { useState } from "react";
import { Link } from "react-router-dom";
import zhsustLogo from "../../assets/FavIcon.jpg"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="flex justify-center items-center mb-6">
          <img className="w-16 h-16" src={zhsustLogo} alt="" />
        </h2>
        <form>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none transition focus:border-transparent focus:ring-2 focus:ring-gradient-to-r focus:ring-indigo-400 focus:ring-pink-400"
            />
            <span className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-indigo-400 to-pink-400 animate-gradient-line"></span>
          </div>
          <div className="relative mb-6">
            <input
              type={`${showPassword ? 'password' : 'text'}`}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none transition focus:border-transparent focus:ring-2 focus:ring-gradient-to-r focus:ring-indigo-400 focus:ring-pink-400"
            />
            <span className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-indigo-400 to-pink-400 animate-gradient-line"></span>
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-indigo-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-400 to-pink-400 text-white py-2 px-4 rounded-lg hover:from-pink-400 hover:to-indigo-400 transition"
          >
            Login
          </button>
        </form>
        <div>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <Link to={`/register`}>Register</Link>
          </p>
          <p className="text-center text-gray-600 mt-2">
            Forgot your password? <a href="#">Reset Password</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import bgImage from "../../assets/ZHSUST.jpg";
import { Link, useNavigate } from "react-router-dom";
import logoZhsust from "../../assets/FavIcon.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signInWithEmail } from "../../authActions/authActions";
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      await dispatch(signInWithEmail(email, password) as any);
  
      Swal.fire({
        title: "Success!",
        text: "Login successful!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/home");
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Invalid email or password. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form
        onSubmit={handleLogin}
        className="relative bg-opacity-10 backdrop-blur-md border-2 border-white p-10 rounded-xl w-96"
      >
        <Link to={"/dashboard/profile"} className="flex justify-center mb-2">
          <img className="w-12 h-12 rounded-md" src={logoZhsust} alt="" />
        </Link>
        <h1 className="text-center text-2xl font-medium text-white mb-6">
          Login
        </h1>

        <div className="space-y-6">
          <div className="border-b-2 border-white flex items-center gap-3">
            <i className="ri-user-line text-white text-xl"></i>
            <div className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-white py-2 focus:outline-none"
                placeholder="E-Mail"
              />
            </div>
          </div>

          <div className="border-b-2 border-white flex items-center gap-3 relative">
            <i className="ri-lock-2-line text-white text-xl"></i>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent text-white py-2 focus:outline-none"
                placeholder="Password"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-white text-sm mt-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <label>Remember me</label>
          </div>
          <Link to={"/forgetPassword"} className="hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={!email || !password || loading}
          className={`w-full py-3 font-medium rounded-lg mt-6 ${
            loading ? "bg-gray-400" : "bg-white text-black"
          }`}
        >
          {loading ? <span>Loading...</span> : "Login"}
        </button>

        <p className="text-center text-white text-sm mt-4">
          Don't have an account?{" "}
          <Link to={"/register"} className="font-medium hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

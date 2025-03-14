import { useState } from "react";
import bgImage from "../../assets/ZHSUST.jpg";
import { Link } from "react-router-dom";
import logoZhsust from "../../assets/FavIcon.jpg";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form className="relative bg-opacity-10 backdrop-blur-md border-2 border-white p-10 rounded-xl w-96">
        <Link to={'/home'} className="flex justify-center mb-2">
          <img className="w-10 h-10 rounded-md" src={logoZhsust} alt="" />
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
                required
                className="w-full bg-transparent text-white py-2 focus:outline-none"
                placeholder="Username"
              />
            </div>
          </div>

          <div className="border-b-2 border-white flex items-center gap-3 relative">
            <i className="ri-lock-2-line text-white text-xl"></i>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-transparent text-white py-2 focus:outline-none"
                placeholder="Password"
              />
              <i
                className={`ri-${
                  showPassword ? "eye-line" : "eye-off-line"
                } absolute right-3 top-3 cursor-pointer text-white`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-white text-sm mt-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <label>Remember me</label>
          </div>
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>

        <button className="w-full py-3 bg-white text-black font-medium rounded-lg mt-6">
          Login
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

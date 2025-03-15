import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../authActions/authActions";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleResetPassword = () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    dispatch(forgotPassword(email));
    setMessage("Password reset email sent. Check your inbox.");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <button
        onClick={handleResetPassword}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send Reset Link
      </button>
      {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default ForgetPassword;

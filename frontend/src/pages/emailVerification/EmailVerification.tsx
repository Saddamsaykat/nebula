import { useState } from "react";
import { sendVerificationEmail } from "../../authActions/authActions";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  console.log(email)

  const handleSendVerification = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
   
    try{
      sendVerificationEmail(email)
      alert("Verification email sent successfully.");
    } catch (error) {
      console.error("Verification email failed:", error);
      alert("Verification email failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <input
        className="input border p-2 rounded"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleSendVerification}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Send Verification Email
      </button>
    </div>
  );
};

export default EmailVerification;

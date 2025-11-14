import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error("Email is required.");
      setLoading(false);
      return;
    }

    try {
      const response = await forgotPassword({ email });

      toast.success("Reset link sent! Check your email.");
    } catch (err) {
      if (err.response?.data?.message.includes("not found")) {
        toast.error("Email not registered in our system.");
      } else {
        toast.error(
          err.response?.data?.message || "Failed to send reset link."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-white">
        <h1
          className="md:hidden text-[32px] md:text-[64px] font-extrabold"
          style={{ fontFamily: "'Merriweather Sans'" }}
        >
          <span className="text-custom-purple">Stock</span>
          <span className="text-custom-blue">Sync</span>
        </h1>
        <p
          className="text-[24px] text-center mt-2"
          style={{ fontFamily: "'Nunito'" }}
        >
          Forgot Password
        </p>
        <p
          className="text-[16px] text-center mt-2"
          style={{ fontFamily: "'Nunito'" }}
        >
          Enter your email and we will send you link to reset <br /> your
          password.
        </p>

        <form
          className="w-full max-w-2xs text-[14px]"
          style={{ fontFamily: "'Nunito'" }}
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div className="relative mt-14 mb-8">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="pl-10 w-full py-2 border border-[#33598B] rounded-xl shadow-sm shadow-[#33598B] focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-1 text-[20px] font-bold bg-custom-purple text-white rounded-full shadow-md hover:bg-custom-purple"
            style={{ fontFamily: "'Merriweather Sans'" }}
          >
            {loading ? "Sending..." : "Next"}
          </button>
        </form>

        <p
          className="absolute text-[15px] font-semibold mt-4 left-5 md:left-20 bottom-5"
          style={{ fontFamily: "'Montserrat'" }}
        >
          Back to{" "}
          <Link to="/login" className="text-custom-blue">
            Login
          </Link>
        </p>
      </div>

      {/* Right Section (Info) */}
      <div className="hidden lg:flex w-1/2 bg-custom-purple justify-center items-center p-10">
        <div className="text-left px-20">
          <h1
            className="text-[32px] md:text-[64px] md:text-[64px] font-extrabold"
            style={{ fontFamily: "'Merriweather Sans'" }}
          >
            <span className="text-white">Stock</span>
            <span className="text-custom-blue">Sync</span>
          </h1>
          <p
            className="mt-3 text-[24px] font-semibold"
            style={{ fontFamily: "'Montserrat'" }}
          >
            Seamless inventory, smarter business.
          </p>
          <p className="mt-3 text-[13px] " style={{ fontFamily: "'Nunito'" }}>
            Welcome to StockSync, your all-in-one solution for seamless
            inventory management. Whether you're a supplier tracking stock, a
            customer placing orders, or an admin overseeing operations, our
            platform keeps everything organized and efficient.
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{ backgroundColor: "#33598B" }}
      />
    </div>
  );
};

export default ForgotPassword;

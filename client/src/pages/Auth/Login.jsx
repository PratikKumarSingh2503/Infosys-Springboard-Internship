import React, { useState, useContext } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { UserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); //  Add User Context

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      toast.error("Both email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        toast.success("Login successful! Redirecting...");
        const { user } = response.data; // Extract user (token is in cookies)
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user); //  Store user in context
        setTimeout(() => {
          if (user.admin) {
            navigate("/dashboard");
          } else {
            navigate("/shop");
          }
        }, 1000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password.");
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
          Login to your account.
        </p>
        <p
          className="text-[16px] text-center mt-2"
          style={{ fontFamily: "'Nunito'" }}
        >
          Access all that StockSync has to offer with a single <br /> account.
          All fields are required.
        </p>

        <form
          className="w-full max-w-2xs mt-6 text-[14px]"
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div className="relative mt-4 mb-8">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full py-2 border border-[#33598B] rounded-xl shadow-sm shadow-[#33598B] focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Password */}
          <div className="relative mb-3">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 pr-10 w-full py-2 border border-[#33598B] rounded-xl shadow-sm shadow-[#33598B] focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-8">
            <Link
              to="/forgot-password"
              className="text-custom-blue font-semibold text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-1 text-[20px] font-bold bg-custom-purple text-white rounded-full shadow-md hover:bg-custom-purple"
            style={{ fontFamily: "'Merriweather Sans'" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          className="absolute text-[15px] font-semibold mt-4 left-5 md:left-20 bottom-5"
          style={{ fontFamily: "'Montserrat'" }}
        >
          Don't have an account?{" "}
          <Link to="/register" className="text-custom-blue">
            Register
          </Link>
        </p>
      </div>

      {/* Right Section (Info) */}
      <div className="hidden lg:flex w-1/2 bg-custom-purple justify-center items-center p-10">
        <div className="text-left px-20">
          <h1
            className="text-[32px] md:text-[64px] font-extrabold"
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
          <p className="mt-3 text-[13px]" style={{ fontFamily: "'Nunito'" }}>
            Welcome to StockSync, your all-in-one solution for seamless
            inventory management. Whether you're a supplier tracking stock, a
            customer placing orders, or an admin overseeing operations, our
            platform keeps everything organized and efficient.
          </p>
        </div>
      </div>

      {/* Toast Container */}
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
        theme="light"
      />
    </div>
  );
};

export default Login;

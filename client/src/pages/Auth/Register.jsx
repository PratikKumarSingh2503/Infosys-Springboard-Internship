import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits.");
      setLoading(false);
      return;
    }

    console.log("Submitting Data:", formData);

    try {
      const response = await register({
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });

      if (response.data.success) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      if (
        err.response?.data?.message.includes("duplicate key") ||
        err.response?.data?.message.includes("email already exists")
      ) {
        toast.error("Email already registered. Please log in.");
      } else {
        toast.error(err.response?.data?.message || "Registration failed.");
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
          Create your account
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
          style={{ fontFamily: "'Nunito'" }}
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div className="relative mb-4">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Fullname"
              className="pl-10 w-full py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="pl-10 w-full py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="pl-10 pr-10 w-full py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="pl-10 pr-10 w-full py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Phone */}
          <div className="relative mb-4">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone No."
              className="pl-10 w-full py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
              pattern="\d{10}" // Ensures exactly 10 digits
              title="Phone number must be exactly 10 digits"
            />
          </div>

          {/* Address */}
          <div className="relative mb-6">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="pl-10 w-full py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-1 text-[20px] font-bold bg-custom-purple text-white rounded-full shadow-md hover:bg-custom-purple"
            style={{ fontFamily: "'Merriweather Sans'" }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p
          className="absolute text-[15px] font-semibold mt-4 left-5 md:left-20 bottom-5"
          style={{ fontFamily: "'Montserrat'" }}
        >
          Already have an account?{" "}
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

export default Register;

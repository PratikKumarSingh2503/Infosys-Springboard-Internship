import React, { useEffect, useState } from "react";
import lap from "../../assets/macbook.webp";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState();
  const [u, setU] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/users/getUser`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setUser(data);
        setU(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/api/users/editProfile`, u, {
        withCredentials: true,
      })
      .then(({ data }) => {
        Cookies.set("token", data.token);
        setIsEditing(false); // Disable editing after saving
        toast.success("Profile updated successfully!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-90px)] flex items-center justify-center bg-gray-100">
        <div className="border border-gray-300 mx-5 w-[900px] bg-white rounded-lg shadow-lg p-6">
          {/* Profile Header */}
          <div className="flex items-center gap-6 border-b pb-4 mb-4">
            <img
              src={lap}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-theme shadow-md object-cover"
            />
            <div className="flex flex-col flex-grow">
              <p className="font-bold text-xl capitalize">
                {u?.fullname || "User Name"}
              </p>
              <p className="text-gray-600">{u?.email || "Email"}</p>
            </div>

            {/* Edit and Save Buttons */}
            <div className="flex gap-3">
              {isEditing ? (
                <button
                  onClick={handleSubmit}
                  className="bg-theme px-5 py-2 rounded-lg font-medium shadow-md bg-[#817AF3] hover:bg-opacity-50 transition"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 px-5 py-2 rounded-lg font-medium shadow-md hover:bg-blue-600 transition"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold">Name</label>
                <input
                  onChange={(e) =>
                    setU((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={u?.fullname || ""}
                  name="fullname"
                  type="text"
                  disabled={!isEditing}
                  className={`w-full p-3 rounded-lg ${
                    isEditing
                      ? "bg-gray-200 focus:outline-none focus:ring-2 focus:ring-theme"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Email</label>
                <input
                  type="text"
                  name="email"
                  disabled
                  value={u?.email || ""}
                  className="bg-gray-300 w-full p-3 rounded-lg cursor-not-allowed"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold">Contact</label>
                <input
                  onChange={(e) =>
                    setU((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  type="text"
                  name="phoneNumber"
                  value={u?.phoneNumber || ""}
                  disabled={!isEditing}
                  className={`w-full p-3 rounded-lg ${
                    isEditing
                      ? "bg-gray-200 focus:outline-none focus:ring-2 focus:ring-theme"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold">Address</label>
                <input
                  onChange={(e) =>
                    setU((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  type="text"
                  name="address"
                  value={u?.address || ""}
                  disabled={!isEditing}
                  className={`w-full p-3 rounded-lg ${
                    isEditing
                      ? "bg-gray-200 focus:outline-none focus:ring-2 focus:ring-theme"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
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
    </>
  );
};

export default Profile;

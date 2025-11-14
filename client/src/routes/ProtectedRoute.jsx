import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ adminOnly = false }) => {
  const context = useContext(UserContext);

  // ✅ Handle undefined context (fixes the "Cannot destructure" error)
  if (!context) return <Navigate to="/authentication" />;

  const { user } = context;

  // 🚫 If no user, redirect to authentication
  if (!user) return <Navigate to="/authentication" />;

  // 🔒 If adminOnly is true but user is not admin, redirect to shop
  if (adminOnly && !user.admin) return <Navigate to="/shop" />;

  return <Outlet />;
};

export default ProtectedRoutes;
// import React, { useContext } from "react";
// import { UserContext } from "../context/UserContext";
// import { Navigate } from "react-router-dom";

// const ProtectedRoutes = ({ adminOnly = false }) => {
//   const { user } = useContext(UserContext);

//   // If no user, redirect to authentication
//   if (!user) return <Navigate to="/authentication" />;

//   // If admin-only route but user is not admin, redirect to home
//   if (adminOnly && !user.admin) return <Navigate to="/shop" />;

//   return <Outlet />;
// };

// export default ProtectedRoutes;

import { React, useEffect } from "react";
import { Outlet, Router, Routes, Route, useNavigate } from "react-router-dom";
import "../App.css";
import LandingPage from "../pages/Auth/LandingPage";
import Register from "../pages/Auth//Register";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgetPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import Profile from "../pages/Auth/Profile";
import AuthenticationPage from "../pages/Auth/AuthenticationPage";
import Shop from "../pages/Shop/Shop";
import Search from "../components/Search";
import ProductOverview from "../components/ProductOverview";
import CategoryOverview from "../components/CategoryOverview";
import Cart from "../pages/Shop/Cart";
import CheckoutPage from "../pages/Shop/CheckoutPage";
import Notification from "../pages/Shop/Notification";
import Dashboard from "../pages/Admin/Dashboard";
import Inventory from "../pages/Admin/Inventory";
import Report from "../pages/Admin/Report";
import Suppliers from "../pages/Admin/Suppliers";
import Orders from "../pages/Admin/Orders";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Cookies from "js-cookie";
import Layout from "../pages/Layout";

function AppRoutes() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/authentication");
    }
  }, []);
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="authentication" element={<AuthenticationPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Layout />}>
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<Search />} />
          <Route path="/shop/:category" element={<CategoryOverview />} />
          <Route path="/product/:id" element={<ProductOverview />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;

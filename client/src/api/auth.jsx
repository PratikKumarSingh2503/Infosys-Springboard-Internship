import axios from "axios";

const API_BASE = import.meta.env.VITE_SERVER_URL
  ? `${import.meta.env.VITE_SERVER_URL.replace(/\/$/, "")}/api`
  : "http://localhost:5000/api";

// Add token to ALL axios requests (Dashboard, Cart, etc. use axios directly) so auth works cross-origin
axios.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" && window.sessionStorage?.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const API = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Authentication
export const register = (userData) => API.post("/users/register", userData);
export const login = (credentials) => API.post("/users/login", credentials);
export const forgotPassword = (credentials) =>
  API.post("/users/forgot-password", credentials);
export const resetPassword = (credentials, token) =>
  API.post(`/users/reset-password/${token}`, credentials);
export const editProfile = (credentials) =>
  API.patch("/users/editProfile", credentials);
export const getUser = () => API.get("/users/getUser");

// Products
export const getProducts = async () => API.get("/product/getproducts");
export const getTopSellingProducts = async () =>
  API.get("/product/getTopSellingProducts");
export const getProductsByCategory = async (category) =>
  API.get(`/product/getProductsByCateogory?category=${category}`);
export const getPaginatedProducts = async (page = 1, limit = 8) =>
  API.get(`/product/productPagination?page=${page}&limit=${limit}`);
export const searchProducts = async (query) =>
  API.get(`/product/searchProduct?search=${query}`);
export const getProductById = async (id) => API.get(`/product/getProduct/${id}`);
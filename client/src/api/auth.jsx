import axios from "axios";

const cleanURL = import.meta.env.VITE_SERVER_URL?.replace(/\/+$/, "");

const API = axios.create({
  baseURL: cleanURL ? `${cleanURL}/api` : "http://localhost:5000/api",
  withCredentials: true,
}); 
// const API = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_URL ? `${import.meta.env.VITE_SERVER_URL}/api` : "http://localhost:5000/api",
//   withCredentials: true,
// });

// Authentication
export const register = (userData) => API.post("/users/register", userData);
export const login = (credentials) => API.post("/users/login", credentials);
export const forgotPassword = (credentials) =>
  API.post("/users/forgot-password", credentials);
export const resetPassword = (credentials, token) =>
  API.post(`/users/reset-password/${token}`, credentials);
export const editProfile = (credentials) =>
  API.patch("/users/editProfile", credentials);
export const getUser = () =>
  API.get("/users/getUser", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

// Products
export const getProducts = async () => API.get("/product/getproducts");
export const getTopSellingProducts = async () =>
  API.get("/product/getTopSellingProducts");
export const getProductsByCategory = async (category) =>
  API.get(`/product/category?category=${category}`);
export const getPaginatedProducts = async (page = 1, limit = 8) =>
  API.get(`/product/pagination?page=${page}&limit=${limit}`);
export const searchProducts = async (query) =>
  API.get(`/product/search?search=${query}`);
export const getProductById = async (id) => API.get(`/product/${id}`);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./api/auth"; // register axios interceptor for Bearer token (cross-origin auth)
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/UserContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
);

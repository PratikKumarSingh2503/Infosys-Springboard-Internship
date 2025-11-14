import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import {
  UserIcon,
  BellIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/users/getUser`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.error('Error fetching user:', err));
  }, []); // Removed user from dependencies to prevent infinite loop
  return (
    <nav className="border-purple-500 border-b-1 px-10 py-5 flex items-center justify-center">
      <div className=" flex-1/5 text-xl font-bold">
        <h1
          className="text-[24px] font-extrabold"
          style={{ fontFamily: "'Merriweather Sans'" }}
        >
          <NavLink to={"/shop"}>
            <span className="text-custom-purple">Stock</span>
            <span className="text-custom-blue">Sync</span>
          </NavLink>
        </h1>
      </div>
      <div className=" flex-3/5">
        <ul className="flex m-0 gap-4 text-lg font-semibold">
          <li className={`px-2 py-1  ${user?.admin ? "" : "hidden"}`}>
            <NavLink
              className={({ isActive }) => (isActive ? "text-theme" : "")}
              to={"/shop"}
            >
              Shop
            </NavLink>
          </li>
          <li className={`px-2 py-1 ${user?.admin ? "" : "hidden"}`}>
            <NavLink
              className={({ isActive }) => (isActive ? "text-theme" : "")}
              to={"/dashboard"}
            >
              Dashboard
            </NavLink>
          </li>
          <li className={`px-2 py-1 ${user?.admin ? "" : "hidden"}`}>
            <NavLink
              className={({ isActive }) => (isActive ? "text-theme" : "")}
              to={"/inventory"}
            >
              Inventory
            </NavLink>
          </li>
          <li className={`px-2 py-1 ${user?.admin ? "" : "hidden"}`}>
            <NavLink
              className={({ isActive }) => (isActive ? "text-theme" : "")}
              to={"/reports"}
            >
              Reports
            </NavLink>
          </li>
          <li className={`px-2 py-1 ${user?.admin ? "" : "hidden"}`}>
            <NavLink
              className={({ isActive }) => (isActive ? "text-theme" : "")}
              to={"/suppliers"}
            >
              Suppliers
            </NavLink>
          </li>
          <li className={`px-2 py-1 ${user?.admin ? "" : "hidden"}`}>
            <NavLink
              className={({ isActive }) => (isActive ? "text-theme" : "")}
              to={"/orders"}
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
      <div className=" flex-1/5">
        <ul className="flex m-0 gap-4 font-semibold flex-row-reverse">
          <li className="px-2 py-1">
            <NavLink
              className={({ isActive }) => (isActive ? "text-theme" : "")}
              to={"/profile"}
            >
              <UserIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
            </NavLink>
          </li>
          <li className="px-2 py-1">
            <NavLink
              className={({ isActive }) => (isActive ? "text-theme" : "")}
              to={"/cart"}
            >
              <ShoppingCartIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
            </NavLink>
          </li>
          <li className={`px-2 py-1 ${user?.admin ? "" : "hidden"}`}>
            <NavLink
              className={({ isActive }) => (isActive ? "text-theme" : "")}
              to={"/notifications"}
            >
              <BellIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
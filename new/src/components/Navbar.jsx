import React from "react";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="bg-gray-900 text-white p-6 flex justify-between min-w-full  position: fixed  items-center ">
      <div>
        <h1 className=" px-4 py-2 text-600">Salary Management</h1>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};
export default Navbar;

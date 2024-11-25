import React, { useState } from "react";
import {
  FaBars,
  FaProjectDiagram,
  FaUserTie,
  FaRegClock,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = () => {
  const [isopen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex position: fixed">
      <div
        className={`w-20 md:w-64 bg-gray-900 transition-width duration-300 text-white h-screen ${
          isopen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <h3
            className={`text-xl text-rose-500 font-bold hidden md:block ${
              isopen ? "block" : "hidden"
            }`}
          >
            Desk <p className="text-white"> Automation</p>
          </h3>
          <button
            className="block md:hidden"
            onClick={() => setIsOpen(!isopen)}
          >
            {isopen ? <IoCloseSharp size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {/* Projects */}
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <FaProjectDiagram className="text-xl" />
              <NavLink
                to="/dashboard?name=projects"
                className={`ml-4 md:block ${
                  isopen ? "block" : "hidden"
                } px-5 py-3 rounded-full ${
                  location.pathname === "/projects"
                    ? "bg-blue-800"
                    : "hover:bg-blue-700"
                }`}
              >
                Projects
              </NavLink>
            </li>
            {/* Employee */}
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <FaUserTie className="text-xl" />
              <NavLink
                to="/dashboard?name=employee"
                className={`ml-4 md:block ${
                  isopen ? "block" : "hidden"
                } px-5 py-3 rounded-full ${
                  location.pathname === "/employee"
                    ? "bg-blue-800"
                    : "hover:bg-blue-700"
                }`}
              >
                Employee
              </NavLink>
            </li>
            {/* Attendance */}
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <FaRegCalendarCheck className="text-xl" />
              <NavLink
                to="/dashboard?name=attendance"
                className={`ml-4 md:block ${
                  isopen ? "block" : "hidden"
                } px-5 py-3 rounded-full ${
                  location.pathname === "/attendance"
                    ? "bg-blue-800"
                    : "hover:bg-blue-700"
                }`}
              >
                Attendance
              </NavLink>
            </li>
            {/* Hourly Rate */}
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <FaRegClock className="text-xl" />
              <NavLink
                to="/dashboard?name=hourlyrate"
                className={`ml-4 md:block ${
                  isopen ? "block" : "hidden"
                } px-5 py-3 rounded-full ${
                  location.pathname === "/hourlyrate"
                    ? "bg-blue-800"
                    : "hover:bg-blue-700"
                }`}
              >
                HourlyRate
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="min-h-screen flex-1"></div>
    </div>
  );
};

export default Sidebar;

/*import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
const Sidebar = () => {
  const [isopen, setIsOpen] = useState(false);
  // const [sidename, setSideName] = useState("");
  const location = useLocation();
  return (
    <div className="flex">
      <div
        className={`  w-20 md:w-64 bg-gray-900 transition-width duration-300 text-white h-sticky 	overflow: hidden;
    ${isopen ? "w-64" : "w-20"}
        `}
      >
        <div className="flex justify-between items-center p-4">
          <h2
            className={`text-xl font-bold  hidden md:block ${
              isopen ? "block" : "hidden"
            }`}
          >
            {" "}
            Dashboard
          </h2>
          <button
            className="block md:hidden"
            onClick={() => setIsOpen(!isopen)}
          >
            {isopen ? <IoCloseSharp size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            <li
              onClick={() => setSideName("Projects")}
              className="flex flex-col  p-4 hover:bg-gray-700 cursor-pointer"
            >
              <NavLink
                to="/dashboard?name=hourly"
                className={`ml-4  md:block ${
                  isopen ? "block" : "hidden"
                }  px-5 py-3 rounded-full ${
                  location.pathname === "/hourly"
                    ? "bg-blue-800"
                    : "hover:bg-blue-700 "
                }`}
              >
                {" "}
                Projects
              </NavLink>
              {/*{sidename === "Projects" && (
                <div className="text-center flex gap-5 flex-col">
                  <Link to="/dashboard/?name=create">Create</Link>
                  <Link to="/dashboard/?name=delete">Delete</Link>
                </div>
              )} */
{
  /*</li>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <NavLink
                to="/dashboard?name=salary"
                className={`ml-4  md:block ${
                  isopen ? "block" : "hidden"
                } px-5 py-3 rounded-full ${
                  location.pathname === "/salary"
                    ? "bg-blue-800"
                    : "hover:bg-blue-700"
                }`}
              >
                Employee
              </NavLink>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <NavLink
                to="/dashboard?name=salary"
                className={`ml-4  md:block ${
                  isopen ? "block" : "hidden"
                } px-5 py-3 rounded-full ${
                  location.pathname === "/salary"
                    ? "bg-blue-800"
                    : "hover:bg-blue-700"
                }`}
              >
                Attendance
              </NavLink>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
              <NavLink
                to="/dashboard?name=salary"
                className={`ml-4  md:block ${
                  isopen ? "block" : "hidden"
                } px-5 py-3 rounded-full ${
                  location.pathname === "/salary"
                    ? "bg-blue-800"
                    : "hover:bg-blue-700"
                }`}
              >
                HourlyRate
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="min-h-screen flex-1"></div>
    </div>
  );
};
export default Sidebar;*/
}

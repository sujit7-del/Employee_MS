import React from "react";
import { NavLink } from "react-router-dom";

import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaHome,
  FaUserCircle,
  FaBullhorn,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import { FiSettings } from "react-icons/fi";

const Sidebar = () => {
    const {user} = useAuth()
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <br/>

      <div className="bg-gray-800 h-12 flex items-center justify-center">
        <h3 className="text-4xl text-center font-pacific">Employee MS</h3>
      </div>

      <br/>
      <br/>
      
      <div className="px-4 space-y-1">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 " : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          end
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 " : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaUserCircle />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 " : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 " : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        
        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : "hover:bg-blue-600"
            } flex items-center space-x-4 block py-2.5 px-4 rounded transition-colors duration-200`
          }
        >
          <FiSettings />
          <span>Settings</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/announcements"
          className={({ isActive }) =>
           ` ${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaBullhorn />
          <span>Announcements</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

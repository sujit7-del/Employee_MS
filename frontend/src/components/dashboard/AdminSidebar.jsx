import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaClipboardList,
  FaClipboardCheck,
  FaHome,
  FaUsers,
  FaBullhorn,
} from "react-icons/fa";

import { FiSettings } from "react-icons/fi";


const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <br/>

      <div className="bg-gray-800 h-12 flex items-center justify-center">
        <h3 className="text-4xl text-center font-pacific">Employee MS</h3>
      </div>

      <br/>
      <br/>

      <div className="px-4">
        <NavLink
          to="/admin-dashboard"
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
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 " : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 " : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 " : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
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
          to={`/admin-dashboard/attendance`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 " : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaClipboardList />
          <span>Attendance</span>
        </NavLink>
        <NavLink
          to={`/admin-dashboard/attendance-report`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 " : " "
            } flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaClipboardCheck />
          <span>Attendance Report</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/setting"
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"
        >
          <FiSettings />
          <span>Settings</span>
        </NavLink>

        <NavLink
  to="/admin-dashboard/announcements"
  className={({ isActive }) =>
    `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
  }
>
  <FaBullhorn />
  <span>Announcements</span>
</NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;

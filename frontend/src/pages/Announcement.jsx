import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";
import AnnouncementCard from "../components/announcements/announcementCard.jsx";
import api from "../services/axiosInstance.js"
import Swal from 'sweetalert2';


//fetch announcements function


const Annoucement = ({ }) => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  //console.log(user);

  //fetchAnnouncements function 
  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem("token")
      //console.log(token);

      if (!token) {
        alert("No token found, please login again.");
        return;
      }
      const response = await api.get("/announcements");

      setAnnouncements(response.data.announcements);
      //console.log(response.data.announcements);

    } catch (error) {
      console.error("Error fetching announcements:", error);
    }

  };

  //delet announcement handle function 
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/announcements/${id}`);

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Announcement deleted successfully',
          text: 'now you will be redirected to updated announcements page',
          showConfirmButton: false,
          timer: 2000
        });
        setAnnouncements(prev => prev.filter(a => a._id !== id));

        setTimeout(() => fetchAnnouncements(), 2000);
      }

    } catch (error) {
      console.error("Error deleting annoucement ", error);

    }
  }
  useEffect(() => {
    // Fetch announcements from the server when the component mounts
    // You can use axios or fetch to get the data


    fetchAnnouncements();



  }, []);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 h-screen transition-colors duration-300 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white  ">Announcements</h2>
        {user.role === "admin" &&
          <button
            onClick={() => navigate("/admin-dashboard/announcements/create")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded transition"
          >
            + Create
          </button>}
      </div>

      <div className="flex flex-col gap-4">
        {announcements.map((a) => (
          <AnnouncementCard
            key={a._id}
            announcement={a}
            isAdmin={a.adminId._id === user._id}

            onEdit={() =>
              navigate(`/admin-dashboard/announcements/edit/${a._id}`)
            }
            onDelete={handleDelete}
          />
        ))}
      </div>

    </div>
  );
}
export default Annoucement;
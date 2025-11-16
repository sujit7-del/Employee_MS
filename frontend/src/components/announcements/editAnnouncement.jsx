import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/authContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import api from "../../services/axiosInstance.js"

const EditAnnoucement = () => {
  const annoucementId = useParams().id;
  console.log(annoucementId);

  //component state variables here
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  //fetchAnnouncements function 
  const fetchAnnouncement = async () => {
    try {
      // const token = localStorage.getItem("token")
      // console.log(token);

      // if (!token) {
      //   alert("No token found, please login again.");
      //   return;
      // }
      const response = await api.get(`/announcements/${annoucementId}`);

      if (response.data.success) {
        setTitle(response.data.announcement.title);
        console.log(response.data.announcement);
        setBody(response.data.announcement.body);
        console.log(response.data.announcement.body);
      }
      

    }
    catch (error) {
      console.error("Error fetching announcements:", error);
    }

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("No token found, please login again.");
        return;
      }
      const data = {
        title: title,
        body: body,

      };

      const response = await api.put(`/announcements/${annoucementId}`, data);

      if (response.data.success) {
        console.log("Announcement created successfully");
        Swal.fire({
          icon: 'success',
          title: 'Announcement Updated successfully',
          text: 'now you will be redirected to announcements page',
          showConfirmButton: false,
          timer: 2000
        });


        setTimeout(() => navigate('/admin-dashboard/announcements'), 2000);
      }

    }
    catch (error) {
      console.error("Error creating announcement:", error);
    }
    // console.log(user);
    // navigate("/admin-dashboard/announcements");
  };

  // useEffects here-------------
  useEffect(() => {
    fetchAnnouncement();
    setLoading(false);
  }, [annoucementId])

  //return componenet here---------------
  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title} //by default vlue
          onChange={(e) => setTitle(e.target.value)}
           required={true}
          className="w-full border px-3 py-2"
        />
        <textarea
          placeholder="Message"
          value={body}  //by default vlue
          onChange={(e) => setBody(e.target.value)}
           required={true}
          className="w-full border px-3 py-2 h-32"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  )

}



export default EditAnnoucement;
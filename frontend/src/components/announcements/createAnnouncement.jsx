import React, { useState } from "react";

import { useAuth } from "../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import api from "../../services/axiosInstance.js"

const CreateAnnoucement = () => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
 // const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      
      const data = {title: title,body: body};

      const response = await api.post("/announcements", data);

      if (response.data.success) {
        console.log("Announcement created successfully");
        Swal.fire({
          icon: 'success',
          title: 'Announcement created successfully',
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
  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Create Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
           required={true}
          className="w-full border px-3 py-2"
        />
        <textarea
          placeholder="Message"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required={true}
          className="w-full border px-3 py-2 h-32"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  )

}

export default CreateAnnoucement;
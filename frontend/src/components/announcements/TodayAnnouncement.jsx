import React,{useState,useEffect} from "react";
import AnnouncementCard from "./announcementCard.jsx";
import api from '../../services/axiosInstance.js';



const TodayAnnouncements = () => {
  const [todayAnnouncements, setTodayAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

 const fetchTodayAnnouncements=async () => {
    try {
          const response= await api.get('/announcements/today');

          if (response.data.success) {
               setTodayAnnouncements(response.data.todayAnnouncements || []);
          }
      
    } catch (error) {
        console.error("Error fetching today's announcements:", error);

    }finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
      fetchTodayAnnouncements();
  },[])
  return (
     <div className="mt-6 p-4 bg-blue-100 dark:text-gray-200 rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 dark:text-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white-200 ">
          Today’s Announcements
        </h2>
        <button
          onClick={fetchTodayAnnouncements}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded transition text-base"
        >
           Refresh
        </button>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mb-4" />

      {/* Announcement List */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : todayAnnouncements.length > 0 ? (
        <div className="flex flex-col gap-4">
          {todayAnnouncements.map((a) => (
            <AnnouncementCard key={a._id} announcement={a} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No announcements for today 🎉</p>
      )}
    </div>)
}

export default TodayAnnouncements;
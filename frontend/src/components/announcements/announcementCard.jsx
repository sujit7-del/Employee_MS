// src/components/AnnouncementCard.jsx
import React from "react";

const AnnouncementCard = ({ announcement, isAdmin, onEdit ,onDelete}) => {
  const { title, body, adminId, createdAt,updatedAt } = announcement;
    console.log(adminId.name);
    
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-700 hover:shadow-lg transition">
      {/* Title Section */}
      <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-400">
        Title : {title}
      </h3>

      {/* Body Section */}
      <p className="text-gray-700 dark:text-gray-300 mt-2">
        Message : {body}
      </p>

      {/* Footer Section */}
      <div className="flex justify-between items-center text-sm text-gray-500  dark:text-gray-200 border-t pt-3">
        <span>
          By: <span className="text-sm text-gray-500 dark:text-gray-200 mt-3">{adminId?.name || "Aimin"}</span>
        </span>
         <div className="flex flex-col text-right">
        <span> UpdatedAt : {new Date(updatedAt).toLocaleString()}</span>
        <span> CreatedAt : {new Date(createdAt).toLocaleString()}</span>
        </div>
      </div>

      {/* Buttons (Admin Only) */}
      {isAdmin && (
        <div className="flex space-x-3 mt-4">
          <button
            onClick={() => onEdit(announcement)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(announcement._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AnnouncementCard;
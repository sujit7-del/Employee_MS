import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'
import TodayAnnouncements from '../announcements/TodayAnnouncement.jsx'

const SummaryCard = () => {
    const {user} = useAuth()
  return (
    <  div className=" bg-blue-200 dark:bg-gray-900 min-h-screen">
    <div className='p-6 bg-blue-200 dark:text-gray-200'>
    <div className="rounded flex bg-blue-100 dark:bg-gray-900">
        <div className={`text-3xl flex justify-center items-center bg-blue-100 dark:bg-gray-900 px-4`}>
            <FaUser />
        </div>
        <div className="pl-4 py-1 bg-blue-100 dark:bg-gray-900">
            <p className="text-lg  bg-blue-100 dark:bg-gray-900 font-semibold">Welcome Back</p>
            <p className="text-xl bg-blue-100 dark:bg-gray-900 font-bold">{user.name}</p>
        </div>
    </div>
    </div>
    {/* Divider line */}
      
      
      {/* Today’s Announcements */}
      <TodayAnnouncements />
    </div>
  )
}
export default SummaryCard
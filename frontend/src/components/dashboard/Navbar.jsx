import React from 'react'
import { useAuth } from '../../context/authContext'
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
    const {user, logout} = useAuth()
    const { darkMode, toggleDarkMode } = useTheme();
  return (
     <div className='flex items-center dark:bg-gray-900 justify-between h-12 bg-teal-600 px-5'>
      {/* Left side */}
      <p className='text-white font-medium'>Welcome, {user.name}</p>

      {/* Right side */}
      <div className='flex items-center gap-2'>
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className='p-2 rounded bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center transition'
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className='px-4 py-1 bg-teal-700 hover:bg-teal-800 text-white rounded transition'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
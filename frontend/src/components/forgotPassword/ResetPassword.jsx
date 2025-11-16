import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import PropTypes from "prop-types";




const ResetPassword = (props) => {
  const navigate = useNavigate();
  const [Newpassword, setNewPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  //handle submit function----------------------------------------------------------------
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (Newpassword !== Confirmpassword) {
      setError("Passwords do not match");
      return;
    }
    try {

      const response = await axios.post(
        "http://localhost:4000/api/auth/reset-password",
        { email: props.email, password: Newpassword }
      );
      

      if (response.data.success) {
        console.log(response.data.message);

        Swal.fire({
          icon: 'success',
          title: 'Password Reset Successful!',
          text: 'You can now log in with your new password.',
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => navigate('/login'), 2000);
      }

    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error)
      } else {
        setError("Server Error")
      }
      console.log(error);

    }


  };



  return (
    <div
      className="flex flex-col items-center h-screen justify-center 
            bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6"
    >
      <h2 className="font-pacific text-3xl text-white">
        Employee Management System
      </h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="*"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Confirm  Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="*"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 "
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

ResetPassword.propTypes = {
  email: PropTypes.string.isRequired,
  setStep: PropTypes.func.isRequired,
};

export default ResetPassword;
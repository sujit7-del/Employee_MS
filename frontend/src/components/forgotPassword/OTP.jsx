import React,{useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";


const OTP = (props) => {

    const [otp, setOTP] = useState("");
     const [error, setError] = useState(null);
    

    const handleSubmit = async (e) => {

    e.preventDefault();
    try {
        
        const response = await axios.post(
            "https://employee-ms-server-eomf.onrender.com/api/auth/OTP-verification",
            { email:props.email,otp }
        );
        if (response.data.success) {
                console.log(response.data.message);
             props.setStep(3);
             
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
                <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} >
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            OTP
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border"
                            placeholder="Enter OTP"
                            onChange={(e) => setOTP(e.target.value)}
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2 "

                        >
                            Verify OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>

          );
}


OTP.propTypes = {
  email: PropTypes.string.isRequired,
  setStep: PropTypes.func.isRequired,
};


export default OTP;

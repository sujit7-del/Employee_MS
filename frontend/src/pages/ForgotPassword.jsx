import React from "react";
import axios from "axios";
import { useState } from "react";
import OTP from "../components/forgotPassword/OTP.jsx";
import EmailVerify from "../components/forgotPassword/EmailVerify.jsx";
import ResetPassword from "../components/forgotPassword/ResetPassword.jsx";

const ForgotPassword = () => {
    
    
    const [ steps, setSteps] = useState(1);
     const [email, setEmail] = useState("");

      return (
        <>
        {steps===0 && <h1>forgot password</h1>}
        { steps===1 &&  <EmailVerify  setStep={setSteps} email={email} setEmail={setEmail} /> }
        { steps===2 &&  <OTP  setStep={setSteps} email={email} /> }
        { steps===3 &&  <ResetPassword  setStep={setSteps} email={email} /> }
        </>
          
          
      );
};

export default ForgotPassword;
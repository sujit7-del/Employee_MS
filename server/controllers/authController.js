import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateOTP from "../services/generateOTP.js";
import sendEmail from "../services/sendEmail.js";
import dotenv from 'dotenv';
dotenv.config();
const EmsEmail = process.env.EmsEmail;
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Wrong Password" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10d" } 
    );

    return res
      .status(200)
      .json({
        success: true, 
        token,
        user: { _id: user._id, name: user.name, role: user.role },
      });
  } catch (error) {
    res.status(500).json({success: false, error: error.message})
  }
};

const verify = (req, res) =>{
    return res.status(200).json({success: true, user: req.user})
}

const emailVerification = async (req, res) => {
  try{
    const { email } = req.body;
    console.log(email);
    
    const user=await User.findOne({email});
    if(!user){
      return  res.status(404).json({success: false, error: "User Not Found"});
    }
    // Here you can add code to send verification email to the user if needed
    console.log(user);
    
    const otp= generateOTP();
    user.otp=otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // valid for 5 minutes
    await user.save();

    sendEmail({
      from: EmsEmail,
      to: user.email,
      subject: "Email Verification OTP",
      text: `Your OTP for email verification is ${user.otp}. It is valid for 5 minutes.`,
    });

    console.log("Generated OTP:", otp,"otpExpiry:", user.otpExpiry);
    
    return res.status(200).json({success: true, message: "Email verification sent"});


  }
  catch(error){
    res.status(500).json({success: false, error: error.message})
  }
};

// OTP Verification Controller-------------------
const OTPVerification = async (req, res) => {
  try{
    const { email,otp } = req.body;
    console.log(email);
    
    const user=await User.findOne({email});
    if(!user){
      return  res.status(404).json({success: false, error: "User Not Found"});
    }
    // Here you can add code to send verification email to the user if needed
    console.log(user);
    if (user.otpExpiry > Date.now() && user.otp===otp) {
      console.log("OTP verified successfully");
      return res.status(200).json({success: true, message: "OTP verified successfully"});
    }
    
   else {
      return res.status(400).json({success: false, error: "Invalid or expired OTP"});
    }
   
 }
  catch(error){
    res.status(500).json({success: false, error: error.message})
  }
};

// Reset Password Controller-------------------
const resetPassword= async (req, res) => {
  try{
    const { email,password } = req.body;
    console.log(email);
    
    const user=await User.findOne({email});
    if(!user){
      return  res.status(404).json({success: false, error: "User Not Found"});
    }
    // Here you can add code to send verification email to the user if needed
    console.log(user);
    const hashedPassword= await bcrypt.hash(password,10);
   
    user.password=hashedPassword;
    await user.save();

   
    console.log("Password reset successfully");
    
    return res.status(200).json({success: true, message: "Password reset successfully"});


  }
  catch(error){
    res.status(500).json({success: false, error: error.message})
  }
};



export { login, verify , emailVerification,OTPVerification ,resetPassword};
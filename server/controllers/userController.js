import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";

import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// Generate JWT Token
const generateToken = (userId)=>{
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET)
}

// Register User
export const registerUser = async (req, res) =>{
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.json({success: false, message: 'All fields are required'})
        }

        if(password.length < 8){
            return res.json({success: false, message: 'Password must be at least 8 characters'})
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return res.json({success: false, message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({name, email, password: hashedPassword})
        const token = generateToken(user._id.toString())
        res.json({success: true, token})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// User Login
export const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.json({success: false, message: 'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: 'Invalid Credentials'})
        }
        const token = generateToken(user._id.toString())
        res.json({success: true, token})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get User date using Token (JWT)
export const getUserData = async (req, res) =>{
    try {
        const {user} = req;
        res.json({success: true, user})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get all cars for the frontend
export const getCars = async (req, res) => {
  try {

    const cars = await Car.find();

    const carsWithAvailability = await Promise.all(
      cars.map(async (car) => {

        const lastBooking = await Booking
          .findOne({ car: car._id })
          .sort({ returnDate: -1 });

        let availableFrom = null;

        if (lastBooking && new Date(lastBooking.returnDate) > new Date()) {
          availableFrom = lastBooking.returnDate;
        }

        return {
          ...car._doc,
          availableFrom
        };
      })
    );

    // ONLY ONE RESPONSE
    return res.json({ success: true, cars: carsWithAvailability });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};


export const forgotPassword = async (req,res) => {
  try{

    const { email } = req.body;

    const user = await User.findOne({ email });

    if(!user)
      return res.status(404).json({ message:"User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15*60*1000;

    await user.save();

    const resetURL =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your CarRental Password",

      html: `
      <div style="
          font-family:Arial;
          background:#000;
          padding:40px;
          color:#fff;
      ">
          <h2 style="color:#facc15;">
              CarRental Password Reset
          </h2>

          <p>Hello ${user.name || "User"},</p>

          <p>
          We received a request to reset your password.
          Click the button below:
          </p>

          <a href="${resetURL}"
            style="
                display:inline-block;
                padding:12px 24px;
                background:#facc15;
                color:#000;
                font-weight:bold;
                text-decoration:none;
                border-radius:8px;
            ">
            Reset Password
          </a>

          <p style="margin-top:20px;font-size:12px;color:#aaa;">
          This link expires in 15 minutes.
          If you didn't request this, ignore this email.
          </p>
      </div>
      `
    });


    res.json({
      success: true,
      message: "Reset email sent"
    });

  }catch(err){
  console.error("FORGOT PASSWORD ERROR >>>", err);
  res.status(500).json({ message: err.message });
  }
};


export const resetPassword = async (req,res)=>{
  try{

    const token = req.params.token;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user)
      return res.status(400).json({ message:"Invalid or expired token" });

    const hashed = await bcrypt.hash(req.body.password, 10);
    user.password = hashed;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful"
    });

  }catch(err){
  console.log("RESET ERROR:", err.response);
  setMsg(err.response?.data?.message || "Reset failed");
  }
};


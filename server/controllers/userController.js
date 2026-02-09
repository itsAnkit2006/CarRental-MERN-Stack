import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";


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

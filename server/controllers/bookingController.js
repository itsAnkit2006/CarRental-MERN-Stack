import Booking from "../models/Booking.js"
import Car from "../models/Car.js"
import Payment from "../models/Payment.js"
import TransactionLog from "../models/TransactionLog.js"
import UserVerification from "../models/UserVerification.js";


// Function to Check Availability of Car for a given Date
const checkAvailability = async (car, pickupDate, returnDate)=>{
    const bookings = await Booking.find({
        car, 
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate},
    })
    
    return bookings.length === 0
}

// API to Check Availability of Cars for the given Date and Location
export const checkAvailabilityOfCar = async(req, res)=>{
    try {
        const {location,pickupDate, returnDate} = req.body

        // fetch all available cars for the given location
        const cars = await Car.find({location, isAvailable: true})

        // check car availability for the given date range using promise
        const availableCarsPromises = cars.map(async (car)=>{
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate) 
            return {...car._doc, isAvailable: isAvailable}
        })

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true)

        res.json({success: true, availableCars})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to create booking
export const createBooking = async(req, res)=>{
    try {
        const {_id} = req.user;

        // Verify user before booking
        const verification = await UserVerification.findOne({ user: _id });

        if (!verification || verification.status !== "verified") {
        return res.json({
            success: false,
            message: "You must complete verification before booking",
        });
        }

        const {car, pickupDate, returnDate} = req.body;

        const isAvailable = await checkAvailability(car, pickupDate, returnDate)
        if(!isAvailable){
            return res.json({success:false, message: "Car is not available"})
        }

        const carData = await Car.findById(car)

        if (!carData || !carData.owner) {
        return res.json({
            success:false,
            message:"Car owner not configured"
        })
        }

        // Calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = carData.pricePerDay * noOfDays;

        const booking = await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate, price})

        // Create Payment Record (UPI/CARD/OFFLINE)
        const paymentMethod = req.body.paymentMethod || "OFFLINE";
        const isOnline = paymentMethod === "UPI" || paymentMethod === "CARD";

        const payment = await Payment.create({
            booking: booking._id,
            user: _id,
            owner: carData.owner,
            amount: price,
            currency: "INR",
            paymentMethod,
            status: isOnline ? "SUCCESS" : "PENDING",
            transactionId: isOnline ? `TXN_${Date.now()}` : "",
            paidAt: isOnline ? new Date() : null,
        })

        // Transaction logs
        await TransactionLog.create({
            user: _id,
            action: "BOOKING_CREATED",
            booking: booking._id,
            car: car,
            amount: price,
            message: "Booking created successfully",
        })

        await TransactionLog.create({
            user: _id,
            action: isOnline ? "PAYMENT_SUCCESS" : "PAYMENT_PENDING",
            booking: booking._id,
            payment: payment._id,
            amount: price,
            message: isOnline ? `Payment completed via ${paymentMethod}` : "Payment pending (offline)",
        })

        res.json({success: true, message: "Booking Created"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to List User Bookings
export const getUserBookings = async (req, res)=>{
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user: _id}).populate("car").sort({createdAt: -1})

        res.json({success: true, bookings})


    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to get Owner Bookings
export const getOwnerBookings = async (req, res)=>{
    try {
        if(req.user.role !== 'owner'){
            return res.json({success: false, message: "Unauthorized"})
        }
        const bookings = await Booking.find({owner: req.user._id}).populate('car user').select("-user.password").sort({createdAt: -1})

        res.json({success: true, bookings})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to change booking status
export const changeBookingStatus = async (req, res)=>{
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body;


        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "Unauthorized"})
        }

        booking.status = status;
        await booking.save();

        res.json({success: true, message: "Status Updated"})
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}
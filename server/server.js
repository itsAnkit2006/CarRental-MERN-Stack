import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./Routes/userRoutes.js";
import ownerRouter from "./Routes/ownerRoutes.js";
import bookingRouter from "./Routes/bookingRoutes.js";
import paymentRouter from "./Routes/paymentRoutes.js";
import feedbackRouter from "./Routes/feedbackRoutes.js";
import verificationRouter from "./Routes/verificationRoutes.js";
import adminRouter from "./Routes/adminRoutes.js";

// Initialize Express App
const app = express()

// Connect Database
await connectDB()

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> res.send("Server is running"))
app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/payments', paymentRouter)
app.use('/api/feedbacks', feedbackRouter)
app.use('/api/verification', verificationRouter)
app.use('/api/admin', adminRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
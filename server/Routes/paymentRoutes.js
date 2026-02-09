import express from "express";
import { protect } from "../middleware/auth.js";
import { getUserPayments, payBooking, getPaymentByBooking } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.get("/user", protect, getUserPayments);
paymentRouter.post("/pay", protect, payBooking);
paymentRouter.get("/booking/:bookingId", protect, getPaymentByBooking);


export default paymentRouter;

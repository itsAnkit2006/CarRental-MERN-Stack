import Admin from "../models/Admin.js";
import UserVerification from "../models/UserVerification.js";
import TransactionLog from "../models/TransactionLog.js";
import User from "../models/User.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Feedback from "../models/Feedback.js";

// Simple Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.json({ success: false, message: "Admin not found" });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET);
    res.json({ success: true, token, admin: { email: admin.email, name: admin.name } });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const adminStats = async (req, res) => {
  try {
    const [users, cars, bookings, payments, pendingVerifications] = await Promise.all([
      User.countDocuments(),
      Car.countDocuments(),
      Booking.countDocuments(),
      Payment.countDocuments(),
      UserVerification.countDocuments({ status: "pending" }),
    ]);

    const logs = await TransactionLog.find().sort({ createdAt: -1 }).limit(10);

    res.json({
      success: true,
      stats: { users, cars, bookings, payments, pendingVerifications },
      logs,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const listVerifications = async (req, res) => {
  try {
    const list = await UserVerification.find()
      .populate("user", "name email image")
      .sort({ createdAt: -1 });

    res.json({ success: true, items: list });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { userId, status } = req.body;

    if (!userId || !status) return res.json({ success: false, message: "userId and status required" });

    const verification = await UserVerification.findOne({ user: userId });
    if (!verification) return res.json({ success: false, message: "Verification not found" });

    verification.status = status;
    verification.verified_on = status === "verified" ? new Date() : null;
    await verification.save();

    await TransactionLog.create({
      action: "VERIFICATION_UPDATED",
      message: `Verification ${status} for user ${userId}`,
    });

    res.json({ success: true, message: "Verification updated", verification });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;

    if (!name || !email || !password || !secret) {
      return res.json({ success: false, message: "All fields required" });
    }

    // ✅ Secret key check
    if (secret !== process.env.ADMIN_REGISTER_SECRET) {
      return res.json({ success: false, message: "Invalid secret key" });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ success: true, message: "Admin created successfully", admin });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Admin: List all payments
export const listPayments = async (req, res) => {
  try {
    const items = await Payment.find()
      .populate("user", "name email")
      .populate("booking")
      .sort({ createdAt: -1 });

    res.json({ success: true, items });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin: List all feedback
export const listFeedback = async (req, res) => {
  try {
    const items = await Feedback.find()
      .populate("user", "name email")
      .populate("car", "brand model")
      .sort({ createdAt: -1 });

    res.json({ success: true, items });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

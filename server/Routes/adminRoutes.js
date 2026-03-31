import express from "express";
import { adminLogin, adminStats, listVerifications, verifyUser, registerAdmin, listPayments, listFeedback } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/stats", adminStats);
adminRouter.get("/verifications", listVerifications);
adminRouter.post("/verify-user", verifyUser);
adminRouter.post("/register", registerAdmin);
adminRouter.get("/payments", listPayments);
adminRouter.get("/feedback", listFeedback);

export default adminRouter;

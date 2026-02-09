import express from "express";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import { getMyVerification, submitVerification } from "../controllers/verificationController.js";

const verificationRouter = express.Router();

verificationRouter.get("/me", protect, getMyVerification);
verificationRouter.post("/submit", protect, upload.single("document"), submitVerification);

export default verificationRouter;

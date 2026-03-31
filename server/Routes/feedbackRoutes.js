import express from "express";
import { protect } from "../middleware/auth.js";
import { addFeedback, getCarFeedbacks } from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.post("/add", protect, addFeedback);
feedbackRouter.get("/car/:carId", getCarFeedbacks);

export default feedbackRouter;

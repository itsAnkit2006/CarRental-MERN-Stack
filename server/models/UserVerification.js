import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const userVerificationSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", required: true, unique: true },

    id_type: { type: String, required: true, maxlength: 50 },
    id_number: { type: String, required: true, unique: true, maxlength: 50 },

    documentImage: { type: String, default: "" },

    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    verified_on: { type: Date },
  },
  { timestamps: true }
);

const UserVerification = mongoose.model("UserVerification", userVerificationSchema);
export default UserVerification;

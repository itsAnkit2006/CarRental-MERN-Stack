import UserVerification from "../models/UserVerification.js";
import TransactionLog from "../models/TransactionLog.js";
import imagekit from "../configs/imageKit.js";
import fs from "fs";

// API: submit verification
export const submitVerification = async (req, res) => {
  try {
    const { id_type, id_number } = req.body;

    if (!id_type || !id_number) {
      return res.json({ success: false, message: "id_type and id_number required" });
    }

    if (!req.file) {
      return res.json({
        success:false,
        message:"Document image required"
      });
    }


    let documentImage = "";

    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: req.file.originalname,
        folder: "/verifications",
      });

      documentImage = imagekit.url({
        path: response.filePath,
        transformation: [{ width: "800" }, { quality: "auto" }, { format: "webp" }],
      });
    }

    const verification = await UserVerification.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        id_type,
        id_number,
        documentImage,
        status: "pending",
        verified_on: null,
      },
      { upsert: true, new: true }
    );

    await TransactionLog.create({
      user: req.user._id,
      action: "VERIFICATION_SUBMITTED",
      message: `User submitted verification: ${id_type}`,
    });

    res.json({ success: true, message: "Verification submitted", verification });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API: get my verification
export const getMyVerification = async (req, res) => {
  try {
    const verification = await UserVerification.findOne({ user: req.user._id });
    res.json({ success: true, verification });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

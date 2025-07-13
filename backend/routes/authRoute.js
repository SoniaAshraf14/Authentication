import express from "express";
const router = express.Router();

import {sendOtp, verifyOtp, resetPassword, loginUser} from "../controller/authControllers.js";

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/login", loginUser);

export default router;

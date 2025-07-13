import express from "express";
import { signupUser, updateUsername, getUserById } from "../controller/userController.js";
import { validateSignup } from "../middleware/validateSignup.js";
import { uploadFields } from "../middleware/upload.js";
import {updateUserPhoto} from '../controller/userController.js'
const router = express.Router();

router.post("/signup", uploadFields, validateSignup, signupUser);
router.patch("/update-username/:userId", updateUsername);
router.get("/:userId", getUserById);
router.patch("/update-photo/:userId", uploadFields, updateUserPhoto);
export default router;

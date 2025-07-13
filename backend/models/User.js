import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    username: { type: String, unique: true },
    usernameUpdatedAt: { type: Date },
    coverPhoto: { type: String },
    profileImage: { type: String },

    // ✅ These are for Forgot Password feature
    otp: String,
    otpExpires: Date,
  },
  { timestamps: true }
);

// ✅ Automatically hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;

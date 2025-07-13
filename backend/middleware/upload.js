// middleware/uploadMiddleware.js
import multer from "multer";
import fs from "fs";
import path from "path";

// 1. Define uploads directory path
const uploadDir = path.resolve("uploads");

// 2. Automatically create the folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("✅ uploads folder created.");
}

// 3. Set up multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // save files in "uploads/"
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// 4. Define fields: coverPhoto and profileImage
const upload = multer({ storage });

export const uploadFields = upload.fields([
  { name: "coverPhoto", maxCount: 1 },
  { name: "profileImage", maxCount: 1 },
]);

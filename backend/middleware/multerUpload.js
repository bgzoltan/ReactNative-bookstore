import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.body.userId;
    const uploadPath = path.join("public/uploads/", userId);

    // Create folder if it doesn’t exist
    console.log(
      "Upload Path //////////////////",
      uploadPath,
      fs.existsSync(uploadPath)
    );
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // save file in uploads/<userId> folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext); // unique filename
  },
});

// Only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

export const multerUpload = multer({ storage, fileFilter });

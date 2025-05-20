import multer from "multer";
import path from "path";
import fs from "fs";

// Create /uploads folder if it doesn't exist
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save to /uploads
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter (accept only images)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  const isValid = fileTypes.test(ext);
  if (isValid) cb(null, true);
  else cb(new Error("Only JPEG, JPG and PNG files are allowed"));
};

const upload = multer({ storage, fileFilter });

export default upload;
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      "emilyn_bakehouse_" +
      Date.now() +
      "_" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const bakeryFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb("Hello! Kindly note that only images are allowed for uploading at Emilyn’s Bakehouse!", false);
  }
};
export const emilynUpload = multer({
  storage,
  fileFilter: bakeryFileFilter,
});
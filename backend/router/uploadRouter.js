import multer from "multer";
import express from "express";
import { isAuth, isAdmin } from "../utils.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(request, file, callBack) {
    callBack(null, "uploads/");
  },
  filename(request, file, callBack) {
    callBack(null, `${Date.now()}.jpeg`);
  },
});

/* defined filter */
const fileFilter = (req, file, callBack) => {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    callBack(null, true);
  } else {
    callBack(new Error("File format should be JPG or JPEG"), false); // if validation failed then generate error
  }
};
/////////////////////

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

uploadRouter.post(
  "/",
  isAuth,
  isAdmin,
  upload.single("image"),
  async (request, response) => {
    response.send(`/${request.file.path}`);
  }
);

export default uploadRouter;

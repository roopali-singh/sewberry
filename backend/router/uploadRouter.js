import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(request, file, callBack) {
    callBack(null, "uploads/");
  },
  filename(request, file, callBack) {
    callBack(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post("/", isAuth, upload.single("image"), (request, response) => {
  response.send(`/${request.file.path}`);
});

export default uploadRouter;

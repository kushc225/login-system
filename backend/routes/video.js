import express from "express";
const route = express.Router();
import { body } from "express-validator";
import { loginOrNot } from "../AuthUser/authUser.js";
import { uploadVideo } from "../controller/video.js";

//                      http://localhost:5000/api/video/uploadVideo
route.post("/uploadVideo", loginOrNot, uploadVideo);

export default route;

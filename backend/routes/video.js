import express from "express";
const route = express.Router();
import { body } from "express-validator";
import { loginOrNot } from "../AuthUser/authUser.js";
import {
  uploadVideo,
  updatingVideo,
  fetchAllVideoFromOwnerId,
  fetchVideoFromId,
} from "../controller/video.js";

//                      http://localhost:5000/api/video/uploadVideo
route.post("/uploadVideo", loginOrNot, uploadVideo);

//                      http://localhost:5000/api/video/updateVideo/id
route.put("/updateVideo/:id", loginOrNot, updatingVideo);

// get all the video according to the owner   http://localhost:5000/api/video/fetchAllVideo/id
route.get("/fetchAllVideo/:id", loginOrNot, fetchAllVideoFromOwnerId);

// get the video details by id          http://localhost:5000/api/video/fetchVideoById/id
route.get("/fetchVideoById/:id", loginOrNot, fetchVideoFromId);

export default route;

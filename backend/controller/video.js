import VideoModel from "../Models/video.js";
import mongoose from "mongoose";
// import { validationResult } from "express-validator";
// import bcryptjs from "bcryptjs";
// import Jwt from "jsonwebtoken";
// import dotenv from "dotenv";

export const uploadVideo = async (req, res) => {
  const { title, des, visibility, thumbnail, tags, userId } = req.body;
  try {
    if (thumbnail === undefined) {
      const videoInfo = await VideoModel.create({
        videoBy: userId,
        title,
        des,
        visibility,
        thumbnail: null,
        tags,
      });
      return res.status(201).json({ success: true, videoInfo });
    } else {
      const videoInfo = await VideoModel.create({
        videoBy: userId,
        title,
        des,
        visibility,
        thumbnail,
        tags,
      });
      return res.status(201).json({ success: true, videoInfo });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
export default { uploadVideo };

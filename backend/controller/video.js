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
        owner: userId,
        title,
        des,
        visibility,
        thumbnail: null,
        tags,
      });
      return res.status(201).json({ success: true, videoInfo });
    } else {
      const videoInfo = await VideoModel.create({
        owner: userId,
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

export const updatingVideo = async (req, res) => {
  try {
    const result = await VideoModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

export const fetchAllVideoFromOwnerId = async (req, res) => {
  try {
    const result = await VideoModel.find({ owner: req.params.id });
    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

export const fetchVideoFromId = async (req, res) => {
  try {
    const result = await VideoModel.findById(req.params.id);
    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
export default {
  uploadVideo,
  updatingVideo,
  fetchAllVideoFromOwnerId,
  fetchVideoFromId,
};

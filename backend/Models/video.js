import mongoose from "mongoose";
const video = mongoose.Schema;
const VideoSchema = video({
  owner: { type: String, required: true },
  title: { type: String, rquired: true },
  des: { type: String, required: true },
  visibility: { type: String, required: true },
  tags: [{ type: String }],
  thumbnail: { type: String },

  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  view: { type: Number, default: 0 },
});

const VideoModel = new mongoose.model("videos", VideoSchema);
export default VideoModel;

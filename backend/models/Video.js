import mongoose from "mongoose";

// Video schema
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  thumbnailUrl: {
    type: String,
    default: "",
  },
  videoUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "All",
  },
  channelId: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
    default: "",
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;

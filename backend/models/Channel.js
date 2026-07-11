import mongoose from "mongoose";

// Channel schema
const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  banner: {
    type: String,
    default: "",
  },
  subscribers: {
    type: Number,
    default: 0,
  },
});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;

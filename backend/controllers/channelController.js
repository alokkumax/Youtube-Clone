import Channel from "../models/Channel.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

// Create a new channel (logged in users only)
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, banner } = req.body;

    // Simple validation
    if (!channelName) {
      return res.status(400).json({ message: "Channel name is required" });
    }

    // Create channel with logged in user as owner
    const newChannel = new Channel({
      channelName,
      owner: req.user.id,
      description: description || "",
      banner: banner || "",
    });

    await newChannel.save();

    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get channels of the logged in user
export const getMyChannels = async (req, res) => {
  try {
    const channels = await Channel.find({ owner: req.user.id });
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get channel by id with videos and owner info
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Find videos that belong to this channel
    const videos = await Video.find({ channelId: channel._id.toString() });

    // Find owner details
    const owner = await User.findById(channel.owner).select("-password");

    res.status(200).json({
      channel,
      videos,
      owner,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

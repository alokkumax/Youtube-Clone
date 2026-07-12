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

// Get all channels (for subscriptions list)
export const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find();
    res.status(200).json(channels);
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
    // Check for invalid id
    if (!req.params.id || req.params.id.length < 12) {
      return res.status(404).json({ message: "Channel not found" });
    }

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
    // Invalid MongoDB id format
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Subscribe to a channel (JWT required)
export const subscribeChannel = async (req, res) => {
  try {
    const channelId = req.params.id;

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.subscriptions.some((id) => String(id) === String(channelId))) {
      return res.status(200).json({
        message: "Already subscribed",
        subscribed: true,
        subscribers: channel.subscribers,
      });
    }

    // Add channel to user subscriptions
    user.subscriptions.push(channelId);
    await user.save();

    // Increase subscriber count
    channel.subscribers = channel.subscribers + 1;
    await channel.save();

    res.status(200).json({
      message: "Subscribed successfully",
      subscribed: true,
      subscribers: channel.subscribers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Unsubscribe from a channel (JWT required)
export const unsubscribeChannel = async (req, res) => {
  try {
    const channelId = req.params.id;

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove channel from subscriptions
    user.subscriptions = user.subscriptions.filter(
      (id) => String(id) !== String(channelId)
    );
    await user.save();

    // Decrease subscriber count
    if (channel.subscribers > 0) {
      channel.subscribers = channel.subscribers - 1;
      await channel.save();
    }

    res.status(200).json({
      message: "Unsubscribed successfully",
      subscribed: false,
      subscribers: channel.subscribers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get channels I subscribed to (JWT required)
export const getSubscriptions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const channels = await Channel.find({
      _id: { $in: user.subscriptions },
    });

    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Check if current user subscribed to this channel
export const checkSubscription = async (req, res) => {
  try {
    const channelId = req.params.id;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const subscribed = user.subscriptions.some(
      (id) => String(id) === String(channelId)
    );

    res.status(200).json({ subscribed });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

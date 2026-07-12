import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// Get all videos (supports search and category filter)
export const getAllVideos = async (req, res) => {
  try {
    const { search, category } = req.query;

    // Build filter object
    let filter = {};

    // Search by title
    if (search && search.trim() !== "") {
      filter.title = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category && category !== "All") {
      filter.category = category;
    }

    const videos = await Video.find(filter);
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get one video by id
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Increase views by 1
    video.views = video.views + 1;
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new video (JWT required)
export const createVideo = async (req, res) => {
  try {
    const { title, description, thumbnailUrl, videoUrl, category, channelId } =
      req.body;

    // Simple validation
    if (!title || !videoUrl || !channelId) {
      return res
        .status(400)
        .json({ message: "Title, video URL and channel ID are required" });
    }

    // Check if channel exists
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Create video
    const newVideo = new Video({
      title,
      description: description || "",
      thumbnailUrl: thumbnailUrl || "",
      videoUrl,
      category: category || "All",
      channelId: channelId,
      channelName: channel.channelName,
    });

    await newVideo.save();

    // Increase channel video count
    channel.videoCount = channel.videoCount + 1;
    await channel.save();

    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a video (JWT required)
export const updateVideo = async (req, res) => {
  try {
    const { title, description, thumbnailUrl, videoUrl, category } = req.body;

    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Update fields if provided
    if (title) {
      video.title = title;
    }
    if (description !== undefined) {
      video.description = description;
    }
    if (thumbnailUrl !== undefined) {
      video.thumbnailUrl = thumbnailUrl;
    }
    if (videoUrl) {
      video.videoUrl = videoUrl;
    }
    if (category) {
      video.category = category;
    }

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a video (JWT required)
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Decrease channel video count
    const channel = await Channel.findById(video.channelId);
    if (channel && channel.videoCount > 0) {
      channel.videoCount = channel.videoCount - 1;
      await channel.save();
    }

    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Like a video
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.likes = video.likes + 1;
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Dislike a video
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.dislikes = video.dislikes + 1;
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

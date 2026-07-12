import Comment from "../models/Comment.js";

// Get all comments for a video
export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a new comment (JWT required)
export const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;

    // Simple validation
    if (!videoId || !text) {
      return res.status(400).json({ message: "Video ID and text are required" });
    }

    if (text.trim() === "") {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const newComment = new Comment({
      videoId,
      userId: req.user.id,
      username: req.user.username,
      text: text,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit a comment (JWT required)
export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only the owner can edit
    if (String(comment.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: "Not allowed to edit this comment" });
    }

    comment.text = text;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a comment (JWT required)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only the owner can delete
    if (String(comment.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: "Not allowed to delete this comment" });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

import express from "express";
import {
  getCommentsByVideo,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Get comments for a video
router.get("/comments/:videoId", getCommentsByVideo);

// Protected comment routes
router.post("/comments", verifyToken, addComment);
router.put("/comments/:id", verifyToken, updateComment);
router.delete("/comments/:id", verifyToken, deleteComment);

export default router;

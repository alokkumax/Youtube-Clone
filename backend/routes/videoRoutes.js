import express from "express";
import {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
} from "../controllers/videoController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Public routes
router.get("/videos", getAllVideos);
router.get("/videos/:id", getVideoById);

// Protected routes
router.post("/videos", verifyToken, createVideo);
router.put("/videos/:id", verifyToken, updateVideo);
router.delete("/videos/:id", verifyToken, deleteVideo);

// Like and dislike
router.put("/videos/:id/like", likeVideo);
router.put("/videos/:id/dislike", dislikeVideo);

export default router;

import express from "express";
import {
  createChannel,
  getChannelById,
  getMyChannels,
} from "../controllers/channelController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Get my channels - protected (must be before /channel/:id)
router.get("/channels/me", verifyToken, getMyChannels);

// Create channel - protected route
router.post("/channel", verifyToken, createChannel);

// Get channel by id - public route
router.get("/channel/:id", getChannelById);

export default router;

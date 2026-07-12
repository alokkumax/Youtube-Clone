import express from "express";
import { createChannel, getChannelById } from "../controllers/channelController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Create channel - protected route
router.post("/channel", verifyToken, createChannel);

// Get channel by id - public route
router.get("/channel/:id", getChannelById);

export default router;

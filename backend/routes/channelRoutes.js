import express from "express";
import {
  createChannel,
  getChannelById,
  getMyChannels,
  getAllChannels,
  subscribeChannel,
  unsubscribeChannel,
  getSubscriptions,
  checkSubscription,
} from "../controllers/channelController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Get all channels - public
router.get("/channels", getAllChannels);

// Get my owned channels - protected
router.get("/channels/me", verifyToken, getMyChannels);

// Get channels I subscribed to - protected
router.get("/channels/subscriptions", verifyToken, getSubscriptions);

// Create channel - protected route
router.post("/channel", verifyToken, createChannel);

// Subscribe / unsubscribe
router.post("/channel/:id/subscribe", verifyToken, subscribeChannel);
router.delete("/channel/:id/subscribe", verifyToken, unsubscribeChannel);
router.get("/channel/:id/subscribed", verifyToken, checkSubscription);

// Get channel by id - public route
router.get("/channel/:id", getChannelById);

export default router;

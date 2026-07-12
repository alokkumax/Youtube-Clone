import express from "express";
import { getProfile } from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Protected route - needs JWT token
router.get("/profile", verifyToken, getProfile);

export default router;

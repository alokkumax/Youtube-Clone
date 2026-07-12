import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("YouTube Clone Backend Running...");
});

// API routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", channelRoutes);
app.use("/", videoRoutes);
app.use("/", commentRoutes);

export default app;

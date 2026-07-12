import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";

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

export default app;

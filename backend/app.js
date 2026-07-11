import express from "express";
import cors from "cors";

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route to check if server is running
app.get("/", (req, res) => {
  res.send("YouTube Clone API is running");
});

export default app;

import express from "express";
import cors from "cors";

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("YouTube Clone Backend Running...");
});

export default app;

import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import getRawBody from "raw-body"; // Add this
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB();
const app = express();

app.use(cors());

// Middleware for Clerk Authentication (for non-webhook routes)
app.use(clerkMiddleware());

// Middleware to get raw body for Clerk Webhook (must come BEFORE express.json())
app.post("/api/clerk", async (req, res, next) => {
  try {
    req.rawBody = (await getRawBody(req)).toString("utf8");
    next();
  } catch (err) {
    next(err);
  }
}, clerkWebhooks);

// JSON parser for other routes (must come AFTER webhook route)
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

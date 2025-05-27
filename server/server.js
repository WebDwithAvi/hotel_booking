import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import bodyParser from "body-parser";

connectDB();
const app = express();

app.use(cors());

// Middleware for Clerk Authentication (for non-webhook routes)
app.use(clerkMiddleware());

// Raw body parser for Clerk Webhooks (required for svix verification)
app.post("/api/clerk", bodyParser.raw({ type: "*/*" }), clerkWebhooks);

// JSON parser for other routes
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

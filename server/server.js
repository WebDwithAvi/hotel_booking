import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(cors());
app.use(express.json())
app.use(clerkMiddleware());

// Raw body parser only for Clerk webhooks


// Webhook route
app.post("/api/clerk", clerkWebhooks);

// Test route
app.get("/", (req, res) => {
    res.send("Server running");
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
});

// Connect DB
 connectDB();

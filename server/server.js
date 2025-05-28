import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(cors());
app.use(clerkMiddleware());

// Raw body parser only for Clerk webhooks
app.use("/api/clerk", bodyParser.raw({ type: "*/*" }));

// Other routes can use JSON parser
app.use(express.json());

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

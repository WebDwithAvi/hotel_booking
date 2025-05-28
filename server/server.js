import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());



// Other routes can use JSON parser


// Webhook route
app.post("/api/clerk", clerkWebhooks);

// Test route
app.get("/", (req, res) => {
    res.send("Server running");
});
const PORT = process.env.PORT || 3001
// Start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is listening on Port ${PORT}`);
    });
};
startServer();


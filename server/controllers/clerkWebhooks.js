import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        console.log("🔔 Clerk webhook received");

        // Prepare webhook verifier
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Extract headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verify raw body (buffer)
        const payload = whook.verify(JSON.stringify(req.body), headers);
        console.log("payload verified: ", payload)
        const { data, type } = req.body;

        // Prepare user data for MongoDB
        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
        };
        console.log("userdata",userData)

        // Handle webhook event types
        switch (type) {
            case "user.created":
                await User.create(userData);
                console.log("user created")
                return res.json({ success: true, message: "User created" });

            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData, { new: true });
                console.log("user deleted")
                return res.json({ success: true, message: "User updated" });

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                return res.json({ success: true, message: "User deleted" });

            default:
                return res.json({ success: true, message: "Unhandled event type" });
        }
    } catch (error) {
        console.error("Webhook error:", error.message);
        return res.status(400).json({ success: false, message: error.message });
    }

};

export default clerkWebhooks;

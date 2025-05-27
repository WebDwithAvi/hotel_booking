import User from "../models/User.js";
import { messageInRaw, Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        // create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // getting headers
        const headers = {
            "svix-id": req.headers["svid-id"],
            "svix-timestamp": req.headers["svid-timestamp"],
            "svix-signature": req.headers["svid-signature"]
        };

        // verifying headers
        await whook.verify(JSON.stringify(req.body), headers)

        // getting data and event type from request body
        const { data, type } = req.body;

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url
        }

        // switch case for diff events
        switch (type) {
            case "user.created":
                await User.create(userData);
                break;
            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                break;
            case "user.deleted":
                await User.findByIdAndDelete(data.id, userData);
                break;

            default:
                break;
        }
        res.json({ success: true, message: "Webhook received" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}
export default clerkWebhooks
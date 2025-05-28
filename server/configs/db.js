import mongoose from "mongoose";
 const  connectDB= async()=>{
    try {
        mongoose.connection.on('connected',()=>
            console.log("Database connected")
        )
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "hotel-booking",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            bufferCommands: false
          });
    } catch (error) {
        console.log(error.message)
    }
}
export default connectDB;
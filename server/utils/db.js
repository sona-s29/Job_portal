import mongoose from "mongoose";
import "./env.js";

const connectDB = async () =>{
    try{
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing. Add it to server/.env or set it in your deployment environment.");
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected successfully")
    } catch (err){
        console.error("MongoDB connection failed:", err.message)
        throw err;
    }
}

export default connectDB;

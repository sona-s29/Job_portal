import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing. Add it to the root .env file or set it in your environment.");
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected successfully")
    } catch (err){
        console.error("MongoDB connection failed:", err.message)
        throw err;
    }
}

export default connectDB;

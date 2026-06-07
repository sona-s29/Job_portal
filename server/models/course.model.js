import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    price: { type: Number, default: 0 },
    thumbnail: String,
    curriculum: [String],
    ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, value: Number, comment: String }],
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);

import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: [String],
    thumbnail: String,
    publishedAt: Date,
}, { timestamps: true });

export const BlogPost = mongoose.model("BlogPost", blogPostSchema);

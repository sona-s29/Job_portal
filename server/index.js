import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./utils/env.js";
import connectDB  from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import extendedRoute from "./routes/extended.route.js"
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

// Proper __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((cookieParser()))
const allowedOrigins = [
    "https://job-portal-w7ke.onrender.com",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    process.env.CLIENT_URL,
    ...(process.env.CLIENT_URLS || "").split(",").map((url) => url.trim()),
].filter(Boolean);

const corsOptions ={
    origin: (origin, callback) => {
        try {
            const hostname = origin ? new URL(origin).hostname : "";
            if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(hostname)) {
                return callback(null, true);
            }
        } catch {
            return callback(new Error("Invalid CORS origin"));
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}
app.use(cors(corsOptions));

// APIs
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)
app.use("/api", extendedRoute)
app.use("/api/v1", extendedRoute)

// Static and catch-all (only if client build exists)
const distDir = path.join(__dirname, "..", "client", "dist");
const distIndex = path.join(distDir, "index.html");
if (fs.existsSync(distIndex)) {
    app.use(express.static(distDir));
    app.get(/.*/, (_, res)=>{
        res.sendFile(distIndex)
    });
} else {
    app.get('/', (_, res) => {
        res.json({ message: "API running. Client build not found." });
    });
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, ()=>{
            console.log(`Server running at port ${PORT}`);
        })
    } catch (error) {
        console.error("Server startup failed. Fix the database connection and try again.");
        process.exit(1);
    }
}

startServer();

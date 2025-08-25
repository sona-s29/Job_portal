import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB  from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

dotenv.config({});
const PORT = process.env.PORT || 3000;
const app = express();

// Proper __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((cookieParser()))
const corsOptions ={
    origin: "https://job-portal-w7ke.onrender.com",
    credentials: true
}
app.use(cors(corsOptions));

// APIs
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)

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

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
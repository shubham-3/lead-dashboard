import express from "express";
import { connectMongoDB } from "./lib/db.js"; // ✅ Updated DB connection
import authRoutes from "./routes/auth.route.js";
import dashRoutes from "./routes/dash.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve(); // Get the current directory name

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const startServer = async () => {
  try {
    await connectMongoDB(); // ✅ Updated
    app.use("/api/auth", authRoutes);
    app.use("/api/dash", dashRoutes);
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve static files from the frontend build directory
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/build/index.html")); // Serve index.html for all other routes
      });
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("DB Connection Failed", err);
  }
};

startServer();

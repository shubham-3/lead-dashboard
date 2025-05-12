import express from "express";
import { connectMongoDB } from "./lib/db.js"; // ✅ Updated DB connection
import authRoutes from "./routes/auth.route.js";
import dashRoutes from "./routes/dash.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("DB Connection Failed", err);
  }
};

startServer();

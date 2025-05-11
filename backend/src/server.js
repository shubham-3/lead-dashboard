import express from "express";
import { connectMysql } from "./lib/db.js"; // Database connection
import authRoutes from "./routes/auth.route.js"; // Auth routes
import cors from "cors";
import cookieParser from "cookie-parser"; // Middleware for parsing cookies
import dashRoutes from "./routes/dash.route.js"; // Leads routes
const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not defined

import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
// Start the server and connect to the database
const startServer = async () => {
  try {
    await connectMysql(); // Connect to MySQL
    app.use("/api/auth", authRoutes); // Use auth routes for user signups
    app.use("/api/dash", dashRoutes); // Use leads routes for lead management

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("DB Connection Failed", err);
  }
};

startServer();

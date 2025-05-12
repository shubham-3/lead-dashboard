// lib/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log("Connected to MongoDB successfully.");
  } catch (err) {
    console.error("Unable to connect to MongoDB:", err);
    throw err;
  }
};

export { connectMongoDB };

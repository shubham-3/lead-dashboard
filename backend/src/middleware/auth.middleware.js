import jwt from "jsonwebtoken";
import User from "../models/User.model.js"; // Assuming this is MongoDB
import { ObjectId } from "mongodb"; // Required for handling MongoDB ObjectIds

export async function protectRoute(req, res, next) {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    let decoded;
    try {
      // Decode the JWT token
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Token expired" });
      }
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Check if userId from token is in the correct format (ObjectId)
    const userId = decoded.userId;

    // Check if the decoded userId is a valid ObjectId
    if (!ObjectId.isValid(userId)) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid User ID" });
    }

    // Use new ObjectId() to instantiate ObjectId properly
    const user = await User.findOne({ _id: new ObjectId(userId) }).select(
      "-password"
    ); // Exclude password field

    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

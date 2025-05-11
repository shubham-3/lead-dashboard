import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
   console.log(decoded);
   
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Find user by ID (without returning password)
    const user = await User.findOne({
      where: { id: decoded.userId },
      attributes: { exclude: ['password'] }, // Exclude password
    });

    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }

    req.user = user; // Attach user to request
    next(); // Continue to next middleware/route handler
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

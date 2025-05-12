// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  { timestamps: true }
);

// Hash password before saving a new user or updating password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;

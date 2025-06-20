import express from 'express';
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword
} from '../controllers/userControllers.js';

import authMiddleware from "../middleware/auth.js";
import userModel from "../models/userModel.js";

const userRouter = express.Router();

// Get logged-in user's info (via JWT token)
userRouter.get("/info", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Register & Login
userRouter.post("/user/register", registerUser);
userRouter.post("/user/login", loginUser);

// Get user profile by ID
userRouter.get("/users/:id", getUserProfile);

// Update user profile by ID
userRouter.put("/users/:id", authMiddleware, updateUserProfile,updateUserPassword);

// userRouter.put('/users/update-password', authMiddleware, updateUserPassword);

export default userRouter;

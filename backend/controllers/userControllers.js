import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import mongoose from "mongoose";
import User from '../models/userModel.js';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_TOKEN);
};

// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

try {
    const user =  await userModel.findOne({email});
    if(!user){
        return res.json({success:false, message:"User doesn't Exists!"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      alert("Invalid")
        return res.json({success:false,message:"Invalid Credentials!"});
    }

    const token =createToken(user._id);
    res.json({success:true, token});

} catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
}  };



// register user
export const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already Exists!" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter correct EmailId!" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter strong password!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name:name, email:email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
    res.json({ success: false, message: "Error registering user." });

  } 
  catch (error) {
    res.json({ success: false, message: "Error!" });

  }
};


// Get user profile
export const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error in getUserProfile:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update user profile
// Update user profile with password check
export const updateUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If user wants to change password, validate old one
    if (req.body.currentPassword && req.body.newPassword) {
      const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Current password is incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.newPassword, salt);
    }

    // Update other fields (optional)
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    await user.save();

    res.json({ success: true, message: "Password updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import { createSecretToken } from "../utils/token.js";
import dotenv from 'dotenv';

dotenv.config();

// Register
export const registerUser = async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or username already in use. Please log in instead.",
      });
    }

    const newUser = new User({
      username,
      email,
      password,
      profile: { first_name, last_name },
    });

    const savedUser = await newUser.save();
    const { password: _, ...userData } = savedUser._doc;

    res.status(201).json({
      message: "User registered successfully!",
      user: userData,
    });

  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Login attempt - Email:", email);

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Incorrect email or password' });

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect email or password' });

    console.log("🔐 Password match:", isMatch);
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });

    res.status(200).json({ 
      message: "User logged in successfully",
      success: true,
      token,  
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }});

  } catch (error) {
    console.error("❌ Login Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Logged In User
export const getLoggedInUser = async (req, res) => {
  try {
    console.log("🧠 req.user:", req.user);
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized – user ID missing" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Fetch User Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Logout user (clear cookie)
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax", // Optional: adjust based on frontend/backend setup
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "User logged out successfully" });
};




import jwt from "jsonwebtoken";
import { EmilynUserModel } from "../models/emilynUser.model.js";
const generateBakehouseToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
export const emilynSignupController = async (req, res) => {
  try {
    const { fullName, email, password, userRole } = req.body;
    const existingUser = await EmilynUserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Hello! An Emilyn's Bakehouse account with this email already exists!",
      });
    }
    const newEmilynUser = new EmilynUserModel({
      fullName,
      email,
      password,
      userRole,
    });
    await newEmilynUser.save();
    return res.status(201).json({
      message: `Welcome to Emilyn’s Bakehouse, ${fullName}! Welcome, Welcome, Welcome!`,
      user: {
        id: newEmilynUser._id,
        fullName: newEmilynUser.fullName,
        email: newEmilynUser.email,
        role: newEmilynUser.userRole,
      },
    });
  } catch (error) {
    console.error("Signup Error at Emilyn Bakehouse:", error);
    res.status(500).json({ message: "Signup failed", error });
  }
};
export const emilynLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emilynUser = await EmilynUserModel.findOne({ email });
    if (!emilynUser) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }
    const isMatch = await emilynUser.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }
    const token = generateBakehouseToken(
      emilynUser._id,
      emilynUser.userRole
    );
    return res.json({
      message: `Welcome back, ${emilynUser.fullName}!`,
      token,
      user: {
        id: emilynUser._id,
        fullName: emilynUser.fullName,
        email: emilynUser.email,
        role: emilynUser.userRole,
      },
    });
  } catch (error) {
    console.error("Login Error at Emilyn Bakehouse:", error);
    res.status(500).json({ message: "Login failed", error });
  }
};
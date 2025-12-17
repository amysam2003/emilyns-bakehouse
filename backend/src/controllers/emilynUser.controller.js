import { EmilynUserModel } from "../models/emilynUser.model.js";
import bcrypt from "bcrypt";
export const updateEmilynProfile = async (req, res) => {
  try {
    const userId = req.emilynUser.userId;
    const { fullName, email } = req.body;
    const user = await EmilynUserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "Hello! User not found" });
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    await user.save();
    res.json({ message: "Profile updated successfully", user: { id: user._id, fullName: user.fullName, email: user.email, role: user.userRole } });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Failed to update profile. Please try again later.", error });
  }
};
export const changeEmilynPassword = async (req, res) => {
  try {
    const userId = req.emilynUser.userId;
    const { currentPassword, newPassword } = req.body;
    const user = await EmilynUserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "Hello! User not found" });
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });
    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Failed to change password. Please try again later.", error });
  }
};
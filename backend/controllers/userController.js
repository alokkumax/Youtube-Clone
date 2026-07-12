import User from "../models/User.js";

// Get logged in user profile
export const getProfile = async (req, res) => {
  try {
    // req.user comes from verifyToken middleware
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

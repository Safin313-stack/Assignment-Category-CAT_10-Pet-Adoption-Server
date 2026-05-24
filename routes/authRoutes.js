import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST /api/auth/token - Generate JWT token
router.post("/token", (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const token = jwt.sign({ email, name }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({ success: true, message: "Token issued" });
});

// POST /api/auth/logout - Clear token
router.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .json({ success: true, message: "Logged out" });
});

export default router;
// auth routes

import express from 'express';
import {
  registerUser,
  loginUser,
  getLoggedInUser,
  logoutUser
} from '../controllers/user.controller.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getLoggedInUser); // protected route

// ✅ Add logout route
router.post("/logout", logoutUser);

export default router;


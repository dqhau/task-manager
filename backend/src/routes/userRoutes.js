import express from "express"
import { register, login, getProfile, updateProfile } from "../controllers/userController.js"
import { authenticateToken } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);

export default router;

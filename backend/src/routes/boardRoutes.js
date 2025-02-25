import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
    createBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
    deleteBoard,
} from "../controllers/boardController.js";

const router = express.Router();

router.post("/", authenticateToken, createBoard);
router.get("/", authenticateToken, getAllBoards);
router.get("/:id", authenticateToken, getBoardById);
router.put("/:id", authenticateToken, updateBoard);
router.delete("/:id", authenticateToken, deleteBoard);

export default router;

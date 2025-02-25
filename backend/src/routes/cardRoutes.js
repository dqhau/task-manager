import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
    createCard,
    getCardsByList,
    updateCard,
    deleteCard,
    moveCard,
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/", authenticateToken, createCard);
router.get("/lists/:list_id", authenticateToken, getCardsByList);
router.put("/:id", authenticateToken, updateCard);
router.delete("/:id", authenticateToken, deleteCard);
router.put("/:cardId/move", authenticateToken, moveCard); // API kéo thả thẻ

export default router;

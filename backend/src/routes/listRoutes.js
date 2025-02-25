import express from "express"
import { authenticateToken } from "../middlewares/authMiddleware.js"
import {
    createList,
    getListsByBoard,
    updateList,
    deleteList,
} from "../controllers/listController.js";

const router = express.Router();

router.post("/", authenticateToken, createList);
router.get("/boards/:board_id", authenticateToken, getListsByBoard);
//router.get("/:id/lists", authenticateToken, getListsByBoard);
router.put("/:id", authenticateToken, updateList);
router.delete("/:id", authenticateToken, deleteList);

export default router;

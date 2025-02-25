import express from "express";
import userRoutes from "./userRoutes.js";
import boardRoutes from "./boardRoutes.js";
import listRoutes from "./listRoutes.js";
import cardRoutes from "./cardRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/boards", boardRoutes);
router.use("/lists", listRoutes);
router.use("/cards", cardRoutes);

export default router;

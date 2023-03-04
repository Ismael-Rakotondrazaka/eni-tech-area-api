import { Router } from "express";
import { showUser } from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";

const userRoutes = Router();

userRoutes.get("/:userId", authMiddleware, showUser);

export { userRoutes };

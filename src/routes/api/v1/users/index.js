import { Router } from "express";
import { showUser, updateUser } from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";

const userRoutes = Router();

userRoutes.get("/:userId", authMiddleware, showUser);
userRoutes.put("/:userId", authMiddleware, updateUser);

export { userRoutes };

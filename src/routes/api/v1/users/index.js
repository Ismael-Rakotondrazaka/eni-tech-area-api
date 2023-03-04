import { Router } from "express";
import { showUser, updateUser } from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";
import { userTagRoutes } from "./userstags/index.js";

const userRoutes = Router();

userRoutes.get("/:userId", authMiddleware, showUser);
userRoutes.put("/:userId", authMiddleware, updateUser);

userRoutes.use("/:userId/usertags", userTagRoutes);
export { userRoutes };

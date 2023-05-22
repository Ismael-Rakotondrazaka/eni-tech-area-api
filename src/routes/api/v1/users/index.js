import { Router } from "express";
import {
  indexUser,
  showUser,
  updateUser,
} from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";
import { userTagRoutes } from "./userstags/index.js";
import { userQuestionRoutes } from "./questions/index.js";
import { userChallengeRoutes } from "./challenges/index.js";
import { searchUser } from "../../../../controllers/users/searchUser.js";

const userRoutes = Router();

userRoutes.get("/search", authMiddleware, searchUser);
userRoutes.get("/:userId", authMiddleware, showUser);
userRoutes.put("/:userId", authMiddleware, updateUser);
userRoutes.get("/", authMiddleware, indexUser);

userRoutes.use("/:userId/usertags", userTagRoutes);
userRoutes.use("/:userId/questions", userQuestionRoutes);
userRoutes.use("/:userId/challenges", userChallengeRoutes);
export { userRoutes };

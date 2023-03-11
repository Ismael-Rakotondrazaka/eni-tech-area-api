import { Router } from "express";
import { indexUserQuestion } from "../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../middlewares/index.js";

const userQuestionRoutes = Router({
  mergeParams: true,
});

userQuestionRoutes.get("/", authMiddleware, indexUserQuestion);

export { userQuestionRoutes };

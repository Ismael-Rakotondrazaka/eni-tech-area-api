import { Router } from "express";
import {
  storeAnswer,
  showAnswer,
  indexAnswer,
} from "../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../middlewares/index.js";
import { commentRoutes } from "./comments/index.js";
import { voteRoutes } from "./votes/index.js";

const answerRoutes = Router({
  mergeParams: true,
});

answerRoutes.get("/", authMiddleware, indexAnswer);
answerRoutes.post("/", authMiddleware, storeAnswer);
answerRoutes.get("/:answerId", authMiddleware, showAnswer);

answerRoutes.use("/:answerId/comments", commentRoutes);

answerRoutes.use("/:answerId/votes", voteRoutes);

export { answerRoutes };

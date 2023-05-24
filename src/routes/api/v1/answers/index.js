import { Router } from "express";
import { storeAnswer, showAnswer } from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";
import { voteRoutes } from "../votes/index.js";

const answerRoutes = Router({
  mergeParams: true,
});

/**
 * Get an answer with votes and user
 */
answerRoutes.get("/:answerId", showAnswer);

answerRoutes.post("/", authMiddleware, storeAnswer);
answerRoutes.use("/:answerId/votes", voteRoutes);

export { answerRoutes };

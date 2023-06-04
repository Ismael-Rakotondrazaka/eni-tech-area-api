import { Router } from "express";
import {
  storeAnswer,
  showAnswer,
  updateAnswer,
  destroyAnswer,
  indexAnswer,
} from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";
import { voteRoutes } from "../votes/index.js";

const answerRoutes = Router({
  mergeParams: true,
});

/**
 * Get an answer with votes and user
 */
answerRoutes.get("/", indexAnswer);
answerRoutes.post("/", authMiddleware, storeAnswer);
answerRoutes.get("/:answerId", showAnswer);
answerRoutes.put("/:answerId", authMiddleware, updateAnswer);
answerRoutes.delete("/:answerId", authMiddleware, destroyAnswer);

// vote routes
answerRoutes.use("/:answerId/votes", voteRoutes);

export { answerRoutes };

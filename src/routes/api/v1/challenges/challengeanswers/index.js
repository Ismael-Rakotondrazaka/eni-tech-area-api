import { Router } from "express";
import {
  indexChallengeAnswer,
  storeChallengeAnswer,
  showChallengeAnswer,
} from "../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../middlewares/index.js";

const challengeAnswerRoutes = Router({
  mergeParams: true,
});

challengeAnswerRoutes.get("/", authMiddleware, indexChallengeAnswer);
challengeAnswerRoutes.post("/", authMiddleware, storeChallengeAnswer);
challengeAnswerRoutes.get(
  "/:challengeAnswerId",
  authMiddleware,
  showChallengeAnswer
);

export { challengeAnswerRoutes };

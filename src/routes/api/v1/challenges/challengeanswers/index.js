import { Router } from "express";
import {
  indexChallengeAnswer,
  storeChallengeAnswer,
} from "../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../middlewares/index.js";

const challengeAnswerRoutes = Router({
  mergeParams: true,
});

challengeAnswerRoutes.get("/", authMiddleware, indexChallengeAnswer);
challengeAnswerRoutes.post("/", authMiddleware, storeChallengeAnswer);

export { challengeAnswerRoutes };

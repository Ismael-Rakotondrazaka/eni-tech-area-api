import { Router } from "express";
import {
  storeChallenge,
  showChallenge,
  indexChallenge,
  indexChallengeSuggestion
} from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";
import { challengeAnswerRoutes } from "./challengeanswers/index.js";

const challengeRoutes = Router();

challengeRoutes.get("/", authMiddleware, indexChallenge);
challengeRoutes.post("/", authMiddleware, storeChallenge);
challengeRoutes.get("/suggestions", authMiddleware, indexChallengeSuggestion);
challengeRoutes.get("/:challengeId", authMiddleware, showChallenge);

challengeRoutes.use("/:challengeId/challengeanswers", challengeAnswerRoutes);

export { challengeRoutes };

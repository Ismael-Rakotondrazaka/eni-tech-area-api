import { Router } from "express";
import {
  storeChallenge,
  showChallenge,
  indexChallenge,
  indexChallengeSuggestion,
  searchChallenge,
} from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";
import { challengeAnswerRoutes } from "./challengeanswers/index.js";
import { challengeTagRoutes } from "./challengetags/index.js";

const challengeRoutes = Router();

challengeRoutes.get("/", authMiddleware, indexChallenge);
challengeRoutes.post("/", authMiddleware, storeChallenge);
challengeRoutes.get("/suggestions", authMiddleware, indexChallengeSuggestion);
challengeRoutes.get("/search", authMiddleware, searchChallenge);
challengeRoutes.get("/:challengeId", authMiddleware, showChallenge);

challengeRoutes.use("/:challengeId/challengeanswers", challengeAnswerRoutes);
challengeRoutes.use("/:challengeId/challengetags", challengeTagRoutes);

export { challengeRoutes };

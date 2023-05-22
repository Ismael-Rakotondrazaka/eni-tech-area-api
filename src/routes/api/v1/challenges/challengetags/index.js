import { Router } from "express";
import { indexChallengeTag } from "../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../middlewares/index.js";

const challengeTagRoutes = Router({
  mergeParams: true,
});

challengeTagRoutes.get("/", authMiddleware, indexChallengeTag);

export { challengeTagRoutes };

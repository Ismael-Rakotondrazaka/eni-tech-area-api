import { Router } from "express";
import {
  indexUserChallenge
} from "../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../middlewares/index.js";

const userChallengeRoutes = Router({
  mergeParams: true,
});

userChallengeRoutes.get("/", authMiddleware, indexUserChallenge);

export { userChallengeRoutes };

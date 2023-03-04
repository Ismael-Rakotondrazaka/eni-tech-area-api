import { Router } from "express";
import {
  storeAnswer,
  showAnswer,
  indexAnswer,
} from "../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../middlewares/index.js";

const answerRoutes = Router({
  mergeParams: true,
});

answerRoutes.get("/", authMiddleware, indexAnswer);
answerRoutes.post("/", authMiddleware, storeAnswer);
answerRoutes.get("/:answerId", authMiddleware, showAnswer);

export { answerRoutes };

import { Router } from "express";
import {
  storeQuestion,
  showQuestion,
  indexQuestion,
  indexQuestionSuggestion,
} from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";
import { answerRoutes } from "./answers/index.js";
import { questionTagRoutes } from "./questionTags/index.js";

const questionRoutes = Router();

questionRoutes.get("/", authMiddleware, indexQuestion);
questionRoutes.get("/suggestions", authMiddleware, indexQuestionSuggestion);
questionRoutes.post("/", authMiddleware, storeQuestion);
questionRoutes.get("/:questionId", authMiddleware, showQuestion);

questionRoutes.use("/:questionId/answers", answerRoutes);

questionRoutes.use("/:questionId/questiontags", questionTagRoutes);

export { questionRoutes };

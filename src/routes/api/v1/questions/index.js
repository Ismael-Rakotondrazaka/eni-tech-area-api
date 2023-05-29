import { Router } from "express";
import {
  storeQuestion,
  showQuestion,
  indexQuestion,
  searchQuestion,
  indexQuestionSuggestion,
  indexQuestionTag,
  deleteQuestion,
  updateQuestion,
} from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";

const questionRoutes = Router();

/**
 * This is a public route, anyone can view all questions
 */
questionRoutes.get("/", indexQuestion);
questionRoutes.get("/:questionId", showQuestion);
questionRoutes.use("/:questionId/tags", indexQuestionTag);

questionRoutes.post("/", authMiddleware, storeQuestion);
questionRoutes.get("/suggestions", authMiddleware, indexQuestionSuggestion);
questionRoutes.get("/search", authMiddleware, searchQuestion);
questionRoutes.delete("/:questionId", authMiddleware, deleteQuestion);
questionRoutes.put("/:questionId", authMiddleware, updateQuestion);

export { questionRoutes };

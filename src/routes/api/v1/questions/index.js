import { Router } from "express";
import { storeQuestion, showQuestion } from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";
import { answerRoutes } from "./answers/index.js";

const questionRoutes = Router();

questionRoutes.post("/", authMiddleware, storeQuestion);
questionRoutes.get("/:questionId", authMiddleware, showQuestion);

questionRoutes.use("/:questionId/answers", answerRoutes);

export { questionRoutes };

import { Router } from "express";
import { indexQuestionTag } from "../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../middlewares/index.js";

const questionTagRoutes = Router({
  mergeParams: true,
});

questionTagRoutes.get("/", authMiddleware, indexQuestionTag);

export { questionTagRoutes };

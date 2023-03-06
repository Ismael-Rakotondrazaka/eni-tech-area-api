import { Router } from "express";
import {
  indexUserQuestion
} from "../../../../../controllers/index.js";
import { authUserMiddleware } from "../../../../../middlewares/index.js";

const userQuestionRoutes = Router({
  mergeParams: true,
});

userQuestionRoutes.get("/", authUserMiddleware, indexUserQuestion);

export { userQuestionRoutes };

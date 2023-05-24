import { Router } from "express";
import { indexQuestionTag } from "../../../../../controllers/index.js";

const questionTagRoutes = Router({
  mergeParams: true,
});

questionTagRoutes.get("/", indexQuestionTag);

export { questionTagRoutes };

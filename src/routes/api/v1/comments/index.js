import { Router } from "express";
import {
  indexComment,
  showComment,
  storeComment,
} from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";

const commentRoutes = Router({
  mergeParams: true,
});

commentRoutes.get("/", indexComment);
commentRoutes.post("/", authMiddleware, storeComment);
commentRoutes.get("/:commentId", authMiddleware, showComment);

export { commentRoutes };

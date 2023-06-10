import { Router } from "express";
import {
  indexComment,
  showComment,
  storeComment,
  updateComment,
} from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";

const commentRoutes = Router({
  mergeParams: true,
});

commentRoutes.get("/", indexComment);
commentRoutes.post("/", authMiddleware, storeComment);
commentRoutes.get("/:commentId", showComment);
commentRoutes.put("/:commentId", authMiddleware, updateComment);

export { commentRoutes };

import { Router } from "express";
import {
  indexUserTag,
} from "../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../middlewares/index.js";

const userTagRoutes = Router({
  mergeParams: true,
});

userTagRoutes.get("/", authMiddleware, indexUserTag);

export { userTagRoutes };

import { Router } from "express";
import {
  indexUserTag,
  storeUserTag,
} from "../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../middlewares/index.js";

const userTagRoutes = Router({
  mergeParams: true,
});

userTagRoutes.get("/", authMiddleware, indexUserTag);
userTagRoutes.post("/", authMiddleware, storeUserTag);

export { userTagRoutes };

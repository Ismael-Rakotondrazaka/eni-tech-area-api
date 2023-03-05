import { Router } from "express";
import {
  destroyUserTag,
  indexUserTag,
  storeUserTag,
} from "../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../middlewares/index.js";

const userTagRoutes = Router({
  mergeParams: true,
});

userTagRoutes.get("/", authMiddleware, indexUserTag);
userTagRoutes.post("/", authMiddleware, storeUserTag);
userTagRoutes.delete("/", authMiddleware, destroyUserTag);

export { userTagRoutes };

import { Router } from "express";
import { indexNotification } from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";

const notificationRoutes = Router();

notificationRoutes.get("/", authMiddleware, indexNotification);

export { notificationRoutes };

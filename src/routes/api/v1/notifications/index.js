import { Router } from "express";
import {
  destroyNotification,
  indexNotification,
} from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";

const notificationRoutes = Router({
  mergeParams: true,
});

notificationRoutes.get("/", authMiddleware, indexNotification);
notificationRoutes.delete(
  "/:notificationId",
  authMiddleware,
  destroyNotification
);

export { notificationRoutes };

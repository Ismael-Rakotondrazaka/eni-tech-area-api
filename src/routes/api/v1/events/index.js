import { Router } from "express";

import {
  indexEvent,
  storeEvent,
  showEvent,
  searchEvent,
} from "../../../../controllers/index.js";
import {
  authMiddleware,
  authAdminMiddleware,
} from "../../../../middlewares/index.js";

const eventRoutes = Router();

eventRoutes.get("/search", authMiddleware, searchEvent);
eventRoutes.get("/:eventId", authMiddleware, showEvent);
eventRoutes.get("/", authMiddleware, indexEvent);
eventRoutes.post("/", authAdminMiddleware, storeEvent);

export { eventRoutes };

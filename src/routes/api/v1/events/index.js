import { Router } from "express";

import { indexEvent, storeEvent, showEvent } from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/authMiddleware.js";

const eventRoutes = Router();

eventRoutes.get("/", authMiddleware, indexEvent);
eventRoutes.get("/:eventId", authMiddleware, showEvent);
eventRoutes.post("/", authMiddleware, storeEvent);

export { eventRoutes };

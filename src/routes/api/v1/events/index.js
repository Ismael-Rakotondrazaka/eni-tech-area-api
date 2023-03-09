import { Router } from "express";

import { storeEvent } from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/authMiddleware.js";

const EventRouter = Router();

EventRouter.post('/',authMiddleware ,storeEvent);

export { EventRouter }
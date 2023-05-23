import { Router } from "express";
import { indexTag } from "../../../../controllers/index.js";

const tagRoutes = Router();

tagRoutes.get("", indexTag);

export { tagRoutes };

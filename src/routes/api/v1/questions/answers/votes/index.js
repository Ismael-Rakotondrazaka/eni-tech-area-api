import { Router } from "express";
import { storeVote, showVote } from "../../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../../middlewares/index.js";

const voteRoutes = Router({
  mergeParams: true,
});

voteRoutes.post("/", authMiddleware, storeVote);
voteRoutes.get("/:voteId", authMiddleware, showVote);

export { voteRoutes };

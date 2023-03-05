import { Router } from "express";
import {
  storeVote,
  showVote,
  indexVote,
  indexVoteCount,
} from "../../../../../../controllers/index.js";
import { authMiddleware } from "../../../../../../middlewares/index.js";

const voteRoutes = Router({
  mergeParams: true,
});

voteRoutes.post("/", authMiddleware, storeVote);
voteRoutes.get("/", authMiddleware, indexVote);
voteRoutes.get("/counts", authMiddleware, indexVoteCount);
voteRoutes.get("/:voteId", authMiddleware, showVote);

export { voteRoutes };

import { Router } from "express";
import { whoami } from "../../../../controllers/auth/whoami.js";
import { register, login } from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/authMiddleware.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.get("/whoami", authMiddleware, whoami);
authRoutes.post("/login", login);

export { authRoutes };

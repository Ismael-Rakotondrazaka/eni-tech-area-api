import { Router } from "express";
import { whoami } from "../../../../controllers/auth/whoami.js";
import {
  localRegister,
  googleRegister,
  localLogin,
  googleLogin,
} from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/authMiddleware.js";

const authRoutes = Router();

authRoutes.post("/register/local", localRegister);
authRoutes.post("/register/google", googleRegister);
authRoutes.post("/login/local", localLogin);
authRoutes.post("/login/google", googleLogin);
authRoutes.get("/whoami", authMiddleware, whoami);

export { authRoutes };

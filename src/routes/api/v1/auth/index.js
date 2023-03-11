import { Router } from "express";
import { whoami } from "../../../../controllers/auth/whoami.js";
import {
  localRegister,
  localLogin,
  resetPassword,
} from "../../../../controllers/index.js";
import { authMiddleware } from "../../../../middlewares/index.js";

const authRoutes = Router();

authRoutes.post("/register/local", localRegister);
authRoutes.post("/login/local", localLogin);
authRoutes.get("/whoami", authMiddleware, whoami);
authRoutes.post("/resetpassword", authMiddleware, resetPassword);

export { authRoutes };

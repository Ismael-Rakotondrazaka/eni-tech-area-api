import { Router } from "express";
import { register, decodeQrCode } from "../../../../controllers/index.js";
import { uploadImage } from "../../../../services/multer/index.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/decode", uploadImage.single("qrCode"), decodeQrCode);

export { authRoutes };

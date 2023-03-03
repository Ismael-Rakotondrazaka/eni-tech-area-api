import { Router } from "express";
import { createQrCode, decodeQrCode } from "../../../../controllers/index.js";
import { uploadImage } from "../../../../services/multer/index.js";

const qrCodeRoutes = Router();

qrCodeRoutes.post("/create", createQrCode);
qrCodeRoutes.post("/decode", uploadImage.single("qrCode"), decodeQrCode);

export { qrCodeRoutes };

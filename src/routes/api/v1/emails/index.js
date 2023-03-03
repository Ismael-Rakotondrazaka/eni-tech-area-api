import { Router } from "express";
import { storeEmail } from "../../../../controllers/index.js";
import { uploadFile } from "../../../../services/multer/index.js";

const emailRoutes = Router();

emailRoutes.post("/", uploadFile.array("attachments"), storeEmail);

export { emailRoutes };

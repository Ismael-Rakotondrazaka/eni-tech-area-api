import { Router } from "express";
import { storeStudentFile } from "../../../../controllers/index.js";
import { uploadFile } from "../../../../services/multer/index.js";

const studentFileRoutes = Router();

studentFileRoutes.post("/", uploadFile.single("studentFile"), storeStudentFile);
//studentFileRoutes.post("/", storeStudentFile);
export { studentFileRoutes };

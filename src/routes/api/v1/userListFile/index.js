import { Router } from "express";
import { storeUserListFile } from "../../../../controllers/index.js";
import { uploadFile } from "../../../../services/multer/index.js";

const userListFileRoutes = Router();
userListFileRoutes.post("/", uploadFile.single("userListFile"), storeUserListFile);
//studentFileRoutes.post("/", uploadFile.single("studentFile"), storeStudentFile);
//studentFileRoutes.post("/", storeStudentFile);
export { userListFileRoutes };

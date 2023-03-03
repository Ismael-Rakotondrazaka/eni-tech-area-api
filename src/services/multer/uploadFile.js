// import { fileConfig } from "../../configs/index.js";
import { storage } from "./storage.js";

import multer from "multer";

const fileOptions = {
  storage,
  limits: {
    // TODO validate the file
    // fileSize: fileConfig.MAX_FILE_SIZE,
  },
};

const uploadFile = multer(fileOptions);

export { uploadFile };

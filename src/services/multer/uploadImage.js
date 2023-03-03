// import { imageConfig } from "../../configs/index.js";
import { storage } from "./storage.js";
// import { BadRequestError } from "../../utils/errors/index.js";

import multer from "multer";

const imageParam = {
  storage,
  fileFilter: (req, file, cb) => {
    try {
      // TODO validate the file
      //   if (imageConfig.IMAGE_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
      //   } else {
      //     cb(
      //       new BadRequestError(
      //         "The file uploaded has not a valid image mimetype.",
      //         {
      //           code: "E2_48",
      //         }
      //       ),
      //       false
      //     );
      //   }
    } catch (error) {
      cb(error, false);
    }
  },
  limits: {
    // fileSize: imageConfig.MAX_IMAGE_SIZE,
    // files: imageConfig.MAX_IMAGE_FIELDS,
  },
};

const uploadImage = multer(imageParam);

export { uploadImage };

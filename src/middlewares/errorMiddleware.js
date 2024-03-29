import jwt from "jsonwebtoken";

import {
  GeneralError,
  UnauthorizedError,
  UnknownError,
} from "../utils/errors/index.js";
import { createErrorResponse } from "../utils/responses/index.js";

const errorMiddleware = (err, req, res, next) => {
  if (err) {
    if (err instanceof GeneralError) {
      return res.status(err.getStatusCode()).json(
        createErrorResponse({
          error: err,
          request: req,
        })
      );
    } else if (err instanceof jwt.JsonWebTokenError) {
      const unauthorizedError = new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

      return res.status(unauthorizedError.getStatusCode()).json(
        createErrorResponse({
          error: unauthorizedError,
          request: req,
        })
      );
    } else {
      const serverError = new UnknownError();

      return res.status(serverError.getStatusCode()).json(
        createErrorResponse({
          error: serverError,
          request: req,
        })
      );
    }
  }

  next();
};

export { errorMiddleware };

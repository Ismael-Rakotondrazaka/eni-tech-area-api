import { GeneralError, UnknownError } from "../utils/errors/index.js";
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

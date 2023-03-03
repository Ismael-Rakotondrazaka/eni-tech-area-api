import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { errorConfig } from "../../configs/index.js";

export class GeneralError extends Error {
  #private;
  #privateMessage = "";
  #statusText;
  #statusCode;
  #dateTime;
  #code;

  constructor({ message, isPrivate = false, code = "E0" }) {
    super(message);
    this.#dateTime = new Date();
    this.#private = isPrivate;

    const defaultMessage =
      this instanceof ServerError
        ? errorConfig.DEFAULT_SERVER_ERROR_MESSAGE
        : this instanceof BadRequestError
          ? errorConfig.DEFAULT_BAD_REQUEST_ERROR_MESSAGE
          : this instanceof NotFoundError
            ? errorConfig.DEFAULT_NOT_FOUND_ERROR_MESSAGE
            : this instanceof ConflictError
              ? errorConfig.DEFAULT_CONFLICT_ERROR_MESSAGE
              : this instanceof UnauthorizedError
                ? errorConfig.DEFAULT_UNAUTHORIZED_ERROR_MESSAGE
                : this instanceof ForbiddenError
                  ? errorConfig.DEFAULT_FORBIDDEN_ERROR_MESSAGE
                  : errorConfig.DEFAULT_UNKNOWN_ERROR_MESSAGE;

    if (this.#private) {
      this.message = defaultMessage;
      this.#privateMessage = message;
    } else {
      this.message = message || defaultMessage;
    }

    this.#statusText =
      this instanceof ServerError
        ? getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        : this instanceof BadRequestError
          ? getReasonPhrase(StatusCodes.BAD_REQUEST)
          : this instanceof NotFoundError
            ? getReasonPhrase(StatusCodes.NOT_FOUND)
            : this instanceof ConflictError
              ? getReasonPhrase(StatusCodes.CONFLICT)
              : this instanceof UnauthorizedError
                ? getReasonPhrase(StatusCodes.UNAUTHORIZED)
                : this instanceof ForbiddenError
                  ? getReasonPhrase(StatusCodes.FORBIDDEN)
                  : getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

    this.#statusCode =
      this instanceof ServerError
        ? StatusCodes.INTERNAL_SERVER_ERROR
        : this instanceof BadRequestError
          ? StatusCodes.BAD_REQUEST
          : this instanceof NotFoundError
            ? StatusCodes.NOT_FOUND
            : this instanceof ConflictError
              ? StatusCodes.CONFLICT
              : this instanceof UnauthorizedError
                ? StatusCodes.UNAUTHORIZED
                : this instanceof ForbiddenError
                  ? StatusCodes.FORBIDDEN
                  : StatusCodes.INTERNAL_SERVER_ERROR;

    this.#code =
      code ||
      (this instanceof ServerError
        ? "E1"
        : this instanceof BadRequestError
          ? "E2"
          : this instanceof NotFoundError
            ? "E3"
            : this instanceof ConflictError
              ? "E4"
              : this instanceof UnauthorizedError
                ? "E5"
                : this instanceof ForbiddenError
                  ? "E6"
                  : "E0"); // for UnknownError
  }

  isPrivate = () => {
    return this.#private;
  };

  getStatusCode = () => {
    return this.#statusCode;
  };

  getStatusText = () => {
    return this.#statusText;
  };

  getCode = () => {
    return this.#code;
  };

  getMessage = () => {
    return this.message;
  };

  getPrivateMessage = () => {
    return this.#privateMessage;
  };

  getDateTime = () => {
    return this.#dateTime;
  };
}

export class ServerError extends GeneralError {}
export class BadRequestError extends GeneralError {}
export class NotFoundError extends GeneralError {}
export class UnauthorizedError extends GeneralError {}
export class ForbiddenError extends GeneralError {}
export class ConflictError extends GeneralError {}
export class UnknownError extends GeneralError {}

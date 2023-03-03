import { NotFoundError } from "../../utils/index.js";

const notFoundController = (req, res, next) => {
  try {
    throw new NotFoundError();
  } catch (error) {
    next(error);
  }
};

export { notFoundController };

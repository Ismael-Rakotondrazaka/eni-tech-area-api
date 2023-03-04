import { BadRequestError } from "../errors/index.js";

const validateTitle = (title) => {
  if (typeof title !== "string")
    throw new BadRequestError({
      message: "title not a string",
      code: "E2_",
    });

  if (title === "")
    throw new BadRequestError({
      message: "title is an empty string",
      code: "E2_",
    });

  return title;
};

export { validateTitle };

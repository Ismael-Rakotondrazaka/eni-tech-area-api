import { BadRequestError } from "../errors/index.js";

const validateContent = (content) => {
  if (typeof content !== "string")
    throw new BadRequestError({
      message: "content not a string",
      code: "E2_",
    });

  if (content === "")
    throw new BadRequestError({
      message: "content is an empty string",
      code: "E2_",
    });

  return content;
};

export { validateContent };

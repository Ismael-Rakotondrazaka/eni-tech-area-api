import { BadRequestError } from "../errors/index.js";

const validateTag = (tag) => {
  if (typeof tag !== "string")
    throw new BadRequestError({
      message: "tag not a string",
      code: "E2_",
    });

  const trimmed = tag.trim();

  return trimmed.toUpperCase();
};

export { validateTag };

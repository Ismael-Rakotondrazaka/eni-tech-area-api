import { BadRequestError } from "../errors/index.js";

const validateFirstName = (firstName) => {
  if (typeof firstName !== "string")
    throw new BadRequestError({
      message: "firstName not a string.",
      code: "E2_15",
    });

  const trimmed = firstName.replace(/\s+/, "");

  if (trimmed === "")
    throw new BadRequestError({
      message: "firstName is empty string",
      code: "E2_16",
    });

  return trimmed;
};

export { validateFirstName };

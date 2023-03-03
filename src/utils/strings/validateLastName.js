import { BadRequestError } from "../errors/index.js";

const validateLastName = (lastName) => {
  if (typeof lastName !== "string")
    throw new BadRequestError({
      message: "lastName not a string.",
      code: "E2_17",
    });

  const trimmed = lastName.replace(/\s+/, "");

  if (trimmed === "")
    throw new BadRequestError({
      message: "lastName is an empty string",
      code: "E2_18",
    });

  return trimmed;
};

export { validateLastName };

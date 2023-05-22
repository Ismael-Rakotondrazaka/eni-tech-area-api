import { BadRequestError } from "../errors/index.js";

const validateLastname = (lastname) => {
  if (typeof lastname !== "string")
    throw new BadRequestError({
      message: "lastname not a string.",
      code: "E2_17",
    });

  const trimmed = lastname.replace(/\s+/, "");

  if (trimmed === "")
    throw new BadRequestError({
      message: "lastname is an empty string",
      code: "E2_18",
    });

  return trimmed; // make the lastname to uppercase
};

export { validateLastname };

import { BadRequestError } from "../errors/index.js";

const validateFirstname = (firstname) => {
  if (typeof firstname !== "string")
    throw new BadRequestError({
      message: "firstname not a string.",
      code: "E2_15",
    });

  const trimmed = firstname.replace(/\s+/, "");

  if (trimmed === "")
    throw new BadRequestError({
      message: "firstname is empty string",
      code: "E2_16",
    });

  return trimmed;
};

export { validateFirstname };

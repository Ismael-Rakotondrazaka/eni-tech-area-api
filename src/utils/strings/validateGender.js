import { BadRequestError } from "../errors/index.js";
import { userConfig } from "../../configs/index.js";

const validateGender = (gender) => {
  if (typeof gender !== "string")
    throw new BadRequestError({
      message: "gender is not a string",
      code: "E2_12",
    });

  const trimmed = gender.replace(/\s+/, " ");

  if (trimmed === "")
    throw new BadRequestError({
      message: "gender is an empty string",
      code: "E2_13",
    });

  const genders = userConfig.GENDERS;

  if (!genders.includes(trimmed))
    throw new BadRequestError({
      message: "Invalid gender.",
      code: "E2_14",
    });

  return trimmed;
};

export { validateGender };

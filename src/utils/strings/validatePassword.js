import { BadRequestError } from "../errors/index.js";

const validatePassword = (password) => {
  if (typeof password !== "string")
    throw new BadRequestError({
      message: "Password not a string.",
      code: "E2_6",
    });

  if (password === "")
    throw new BadRequestError({
      message: "Password is empty string.",
      code: "E2_7",
    });
};

export { validatePassword };

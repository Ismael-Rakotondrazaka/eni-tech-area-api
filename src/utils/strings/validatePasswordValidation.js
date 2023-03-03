import { BadRequestError } from "../errors/index.js";

const validatePasswordValidation = (passwordValidation, password) => {
  if (passwordValidation !== password)
    throw new BadRequestError({
      message: "passwordValidation is different of password",
      code: "E2_19",
    });
};

export { validatePasswordValidation };

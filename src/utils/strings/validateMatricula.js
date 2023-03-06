import { BadRequestError } from "../errors/index.js";

const validateMatricula = (matricula) => {
  if (!/^\d+$/.test(matricula))
    throw new BadRequestError({
      message: "matricula is not valid",
      code: "E2_",
    });

  return +matricula;
};

export { validateMatricula };

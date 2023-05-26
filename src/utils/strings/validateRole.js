import { BadRequestError } from "../errors/index.js";

const validateRole = (role) => {
  const roles = ["user", "admin"];

  if (!roles.includes(role))
    throw new BadRequestError({
      message: "invalid role",
      code: "E2_",
    });

  return role;
};

export { validateRole };

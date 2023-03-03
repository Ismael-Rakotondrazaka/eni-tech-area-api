import { compareSync } from "bcrypt";

const comparePassword = (password, passwordHashed) => {
  return compareSync(password, passwordHashed);
};

export { comparePassword };

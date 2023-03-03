import dotenv from "dotenv";
import { hashSync } from "bcrypt";

dotenv.config();

const passwordSaltRound = +process.env.PASSWORD_SALT_ROUND;

const hashPassword = (password) => {
  return hashSync(password, passwordSaltRound);
};

export { hashPassword };

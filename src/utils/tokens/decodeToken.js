import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const decodeToken = (token) => {
  return jwt.decode(token);
};

export { decodeToken };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

const createAccessToken = (data) => {
  return jwt.sign(data, accessTokenSecret, {
    expiresIn: accessTokenLife,
  });
};

export { createAccessToken };

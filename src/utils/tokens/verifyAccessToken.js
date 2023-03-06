import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const verifyAccessToken = (accessToken) => {
  return verify(accessToken, accessTokenSecret);
};

export { verifyAccessToken };

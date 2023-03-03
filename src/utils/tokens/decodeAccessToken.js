import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const decodeAccessToken = (accessToken) => {
  return verify(accessToken, accessTokenSecret);
};

export { decodeAccessToken };

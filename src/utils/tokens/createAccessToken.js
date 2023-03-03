import jwt from "jsonwebtoken";

const createAccessToken = ({ data, accessTokenSecret, accessTokenLife }) => {
  const now = Date.now();

  return {
    accessToken: jwt.sign(data, accessTokenSecret, {
      expiresIn: `${accessTokenLife}ms`,
    }),
    expiresAt: new Date(now + accessTokenLife),
  };
};

export { createAccessToken };

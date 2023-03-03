import { nanoid } from "nanoid";

const createRandomString = (length = 21) => {
  return nanoid(length);
};

export { createRandomString };

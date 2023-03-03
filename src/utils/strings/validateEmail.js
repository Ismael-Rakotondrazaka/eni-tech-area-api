import { BadRequestError } from "../errors/index.js";

const validateEmail = (email) => {
  if (typeof email !== "string") {
    throw new BadRequestError({
      message: "The email is not a string.",
      code: "E2_8",
    });
  }

  const trimmed = email.replace(/\s+/g, "");

  if (trimmed.length === 0)
    throw new BadRequestError({
      message: "The email is an empty string.",
      code: "E2_9",
    });

  if (
    !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g.test(
      trimmed
    )
  )
    throw new BadRequestError({
      message: "Invalid email address",
      code: "E2_10",
    });

  return trimmed;
};

export { validateEmail };

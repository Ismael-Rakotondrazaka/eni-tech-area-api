import { BadRequestError } from "../errors/index.js";

const validateChallengeQuestion = (question) => {
  if (typeof question !== "string")
    throw new BadRequestError({
      message: "question not a string",
      code: "E2_",
    });

  if (question === "")
    throw new BadRequestError({
      message: "question is an empty string",
      code: "E2_",
    });

  return question;
};

export { validateChallengeQuestion };

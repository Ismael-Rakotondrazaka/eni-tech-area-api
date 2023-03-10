import { BadRequestError } from "../errors/index.js";

const validateChallengeAnswer = (answer) => {
  if (typeof answer !== "string")
    throw new BadRequestError({
      message: "answer not a string",
      code: "E2_",
    });

  if (answer === "")
    throw new BadRequestError({
      message: "answer is an empty string",
      code: "E2_",
    });

  return answer;
};

export { validateChallengeAnswer };

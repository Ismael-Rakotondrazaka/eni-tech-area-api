import { BadRequestError } from "../errors/index.js";

const validateChallengeAnswerStatus = (status) => {
  const validStatus = ["failure", "success"];

  if (typeof status !== "string")
    throw new BadRequestError({
      message: "status is not a string",
      code: "E2_",
    });

  if (!validStatus.includes(status))
    throw new BadRequestError({
      message: "status is not valid",
      code: "E2_",
    });

  return status;
};

export { validateChallengeAnswerStatus };

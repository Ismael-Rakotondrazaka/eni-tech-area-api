import { BadRequestError } from "../errors/index.js";
import { challengeConfig } from "../../configs/index.js";

const validateChallengeAnswerStatus = (status) => {
  if (typeof status !== "string")
    throw new BadRequestError({
      message: "status is not a string",
      code: "E2_",
    });

  if (!challengeConfig.CHALLENGE_STATUS_CUSTOMIZABLE.includes(status))
    throw new BadRequestError({
      message: "status is not valid",
      code: "E2_",
    });

  return status;
};

export { validateChallengeAnswerStatus };

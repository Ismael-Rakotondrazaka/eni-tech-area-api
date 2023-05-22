import { BadRequestError } from "../errors/index.js";

const validateChallengeDifficulty = (difficulty) => {
  if (typeof difficulty !== "string")
    throw new BadRequestError({
      message: "difficulty is not a string",
      code: "E2_",
    });

  const validDifficulty = ["easy", "medium", "difficult"];

  if (!validDifficulty.includes(difficulty))
    throw new BadRequestError({
      message: "difficulty is not valid",
      code: "E2_",
    });

  return difficulty;
};

export { validateChallengeDifficulty };

import { BadRequestError } from "../errors/index.js";

const validateVoteType = (type) => {
  const validVotes = ["up", "down"];

  if (!validVotes.includes(type))
    throw new BadRequestError({
      message: "vote type invalid",
      code: "E2_",
    });

  return type;
};

export { validateVoteType };

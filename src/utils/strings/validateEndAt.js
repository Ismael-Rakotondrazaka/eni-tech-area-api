import { BadRequestError } from "../errors/index.js";

const validateEndAt = (endAt) => {
  const minTime = 900000; // 15mn

  const now = new Date();

  if (endAt.getTime() - now.getTime() < minTime)
    throw new BadRequestError({
      message: "endAt must be in the future (15 min)",
      code: "E2_",
    });

  return endAt;
};

export { validateEndAt };

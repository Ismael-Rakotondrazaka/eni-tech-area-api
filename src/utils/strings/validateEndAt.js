import { BadRequestError } from "../errors/index.js";

const validateEndAt = (endAt) => {
  if (!endAt)
    throw new BadRequestError({
      message: "endAt is required.",
      code: "E2_",
    });

  const minTime = 900000; // 15mn

  const now = new Date();

  const toCompare = new Date(endAt);

  if (isNaN(toCompare.getTime()))
    throw new BadRequestError({
      message: "endAt is not a valid date.",
      code: "E2_",
    });

  if (toCompare.getTime() - now.getTime() < minTime)
    throw new BadRequestError({
      message: "endAt must be in the future (15 min)",
      code: "E2_",
    });

  return endAt;
};

export { validateEndAt };

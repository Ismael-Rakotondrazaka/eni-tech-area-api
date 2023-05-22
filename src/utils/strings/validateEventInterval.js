import { BadRequestError } from "../errors/index.js";
const validateEventInterval = (startAt, endAt) => {
  if (!startAt)
    throw new BadRequestError({
      message: "startAt is required",
      code: "E2_",
    });

  if (!endAt)
    throw new BadRequestError({
      message: "endAt is required",
      code: "E2_",
    });

  const startDate = new Date(startAt);
  const endDate = new Date(endAt);
  const now = new Date();

  if (isNaN(startDate.getTime()))
    throw new BadRequestError({
      message: "startAt is invalid",
      code: "E2_",
    });

  if (isNaN(endDate.getTime()))
    throw new BadRequestError({
      message: "endAt is invalid",
      code: "E2_",
    });

  if (now.getTime() >= startDate.getTime)
    throw new BadRequestError({
      message: "start must be in the future",
      code: "E2_",
    });

  if (endDate.getTime() < startDate.getTime())
    throw new BadRequestError({
      message: "endAt must be greater than startAt",
      code: "E2_",
    });

  return { startAt: startDate, endAt: endDate };
};

export { validateEventInterval };

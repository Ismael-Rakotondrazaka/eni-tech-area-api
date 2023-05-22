import { Event, User } from "../../models/index.js";
import { eventCollection } from "../../resources/index.js";
import { UnauthorizedError, createDataResponse } from "../../utils/index.js";

const indexEvent = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetEvent = await Event.findAll({
      order: [
        ["startAt", "DESC"],
        ["createdAt", "DESC"],
      ],
    });

    const targetEventCollection = eventCollection(targetEvent);

    const data = {
      events: targetEventCollection,
    };

    const dataResponse = createDataResponse({
      data,
      request: req,
    });

    return res.json(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { indexEvent };

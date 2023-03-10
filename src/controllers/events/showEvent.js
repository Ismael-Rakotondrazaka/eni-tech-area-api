import { Event, User } from "../../models/index.js";
import { eventResource } from "../../resources/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";

const showEvent = async (req, res, next) => {
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

    const { eventId } = req.params;

    if (!/\d+/.test(eventId)) throw new NotFoundError();

    const targetEvent = await Event.findByPk(+eventId);

    if (!targetEvent) throw new NotFoundError();

    const targetEventResource = eventResource(targetEvent);

    const data = {
      event: targetEventResource,
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

export { showEvent };

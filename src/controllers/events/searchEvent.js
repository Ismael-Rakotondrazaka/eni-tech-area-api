import { Event, User } from "../../models/index.js";
import { eventCollection } from "../../resources/index.js";
import {
  UnauthorizedError,
  BadRequestError,
  createDataResponse,
} from "../../utils/index.js";
import { Op } from "sequelize";

const searchEvent = async (req, res, next) => {
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

    const { title, content, both } = req.query;

    if (!(title || content || both))
      throw new BadRequestError({
        message: "query parameters missing",
        code: "E2_",
      });

    let targetEvents = [];

    if (title) {
      targetEvents = await Event.findAll({
        where: {
          title: {
            [Op.substring]: title,
          },
        },
        order: [
          ["startAt", "DESC"],
          ["createdAt", "DESC"],
        ],
      });
    } else if (content) {
      targetEvents = await Event.findAll({
        where: {
          content: {
            [Op.substring]: content,
          },
        },
        order: [
          ["startAt", "DESC"],
          ["createdAt", "DESC"],
        ],
      });
    } else {
      targetEvents = await Event.findAll({
        where: {
          [Op.or]: {
            title: {
              [Op.substring]: both,
            },
            content: {
              [Op.substring]: both,
            },
          },
        },
        order: [
          ["startAt", "DESC"],
          ["createdAt", "DESC"],
        ],
      });
    }

    const targetEventsCollection = eventCollection(targetEvents);

    const data = {
      events: targetEventsCollection,
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

export { searchEvent };

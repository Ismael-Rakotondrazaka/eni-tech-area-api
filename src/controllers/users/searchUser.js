import { Op } from "sequelize";

import { User, UserTag } from "../../models/index.js";
import {
  UnauthorizedError,
  BadRequestError,
} from "../../utils/errors/index.js";
import { createDataResponse } from "../../utils/responses/index.js";
import { userCollection } from "../../resources/index.js";

const searchUser = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { name, level, tagName } = req.query;

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

    if (!(name || level || tagName))
      throw new BadRequestError({
        message: "query parameters missing",
        code: "E2_",
      });

    let targetUsers = [];

    if (name) {
      targetUsers = await User.findAll({
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.substring]: name,
              },
            },
            {
              lastName: {
                [Op.substring]: name,
              },
            },
          ],
        },
        order: [
          ["firstName", "ASC"],
          ["lastName", "ASC"],
        ],
      });
    } else if (level) {
      targetUsers = await User.findAll({
        where: {
          level: level.toUpperCase(),
        },
        order: [
          ["firstName", "ASC"],
          ["lastName", "ASC"],
        ],
      });
    } else {
      targetUsers = await User.findAll({
        includes: [
          {
            model: UserTag,
            where: {
              tagName: tagName.toUpperCase(),
            },
          },
        ],
        order: [
          ["firstName", "ASC"],
          ["lastName", "ASC"],
        ],
      });
    }

    const targetUsersSource = userCollection(targetUsers);

    const data = {
      users: targetUsersSource,
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

export { searchUser };

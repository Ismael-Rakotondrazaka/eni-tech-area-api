import { User, UserTag } from "../../models/index.js";
import {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  createDataResponse,
  validateTag,
} from "../../utils/index.js";
import { userTagCollection } from "../../resources/index.js";
import { Op } from "sequelize";

const storeUserTag = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { userId: targetUserId } = req.params;
    let { tags } = req.body;

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

    const targetUser = await User.findByPk(targetUserId);

    if (!targetUser) throw new NotFoundError();

    if (targetUser.id !== authUser.id) throw new ForbiddenError();

    if (!Array.isArray(tags))
      throw new BadRequestError({
        message: "tags in not an array",
        code: "E2_",
      });

    tags = tags.map((tag) => validateTag(tag));

    const oldTags = await UserTag.findAll({
      where: {
        userId: authUser.id,
        tagName: {
          [Op.in]: tags,
        },
      },
    });

    const oldTagsNames = oldTags.map((tag) => tag.tagName);

    const newTagsNames = [];
    tags.forEach((tag) => {
      if (!oldTagsNames.includes(tag)) {
        newTagsNames.push(tag);
      }
    });

    const temp = await UserTag.bulkCreate(
      newTagsNames.map((tag) => ({
        userId: authUser.id,
        tagName: tag,
      }))
    );

    const newTagsIds = temp.map((tag) => tag.id);

    const targetUserTags = await UserTag.findAll({
      where: {
        id: newTagsIds,
        userId: authUser.id,
      },
    });

    const targetUserTagsResource = userTagCollection(targetUserTags);

    const data = {
      tags: targetUserTagsResource,
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

export { storeUserTag };

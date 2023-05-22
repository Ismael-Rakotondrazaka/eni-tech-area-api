import { User, UserTag } from "../../models/index.js";
import {
  UnauthorizedError,
  BadRequestError,
  createDataResponse,
  validateTag,
} from "../../utils/index.js";
import { Op } from "sequelize";
import { userTagCollection } from "../../resources/userTagCollection.js";

const destroyUserTag = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
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

    if (!Array.isArray(tags))
      throw new BadRequestError({
        message: "tags in not an array",
        code: "E2_",
      });

    tags = tags.map((tag) => validateTag(tag));

    const tagsToDelete = await authUser.getTags({
      where: {
        name: {
          [Op.in]: tags,
        },
      },
      attributes: ["id"],
    });

    await UserTag.destroy({
      where: {
        userId: authUser.id,
        tagId: tagsToDelete.map((tag) => tag.id),
      },
    });

    const targetUserTags = await authUser.getTags();

    const targetUserTagsCollection = userTagCollection(targetUserTags);

    const data = {
      tags: targetUserTagsCollection,
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

export { destroyUserTag };

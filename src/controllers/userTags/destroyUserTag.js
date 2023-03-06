import { User, UserTag } from "../../models/index.js";
import {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  createDataResponse,
  validateTag,
} from "../../utils/index.js";
import { Op } from "sequelize";

const destroyUserTag = async (req, res, next) => {
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

    const deletedCount = await UserTag.destroy({
      where: {
        tagName: {
          [Op.in]: tags,
        },
      },
    });

    const data = {
      deleted: {
        count: deletedCount,
      },
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

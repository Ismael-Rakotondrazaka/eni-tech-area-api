import { User, UserTag, Tag } from "../../models/index.js";
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
import tinycolor from "tinycolor2";

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

    // check if the tags already exist
    const existedTags = await Tag.findAll({
      where: {
        name: {
          [Op.in]: [tags],
        },
      },
    });
    const existedTagsName = existedTags.map((existedTag) => existedTag.name);

    // if they exist and the user does not have them, we just create the UserTag
    const ownedTags = await authUser.getTags({
      attributes: ["name"],
    });
    const ownedTagsName = ownedTags.map((ownedTag) => ownedTag.name);

    const notOwnedTags = existedTags.filter(
      (tag) => !ownedTagsName.includes(tag.name)
    );

    await UserTag.bulkCreate(
      notOwnedTags.map((tag) => ({
        userId: authUser.id,
        tagId: tag.id,
        questionScore: 0,
        challengeScore: 0,
      }))
    );

    // then we filter the tag that has not been created and create them
    const tagsNameToCreate = tags.filter(
      (tag) => !existedTagsName.includes(tag)
    );

    const newTags = await Tag.bulkCreate(
      tagsNameToCreate.map((name) => {
        // TODO check famous techno colors

        const bg = tinycolor.random();
        const textColor = bg.isLight() ? "#000" : "#fff";

        return {
          name,
          bgColor: bg.toHexString(),
          textColor,
        };
      })
    );

    await Promise.all(
      newTags.map(async (tag) => {
        await tag.reload();
      })
    );

    await UserTag.bulkCreate(
      newTags.map((tag) => ({
        userId: authUser.id,
        tagId: tag.id,
        questionScore: 0,
        challengeScore: 0,
      }))
    );

    const targetTags = await authUser.getTags();

    const targetTagsCollection = userTagCollection(targetTags);

    const data = {
      tags: targetTagsCollection,
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

import { Challenge, User, ChallengeTag, Tag } from "../../models/index.js";
import { challengeResource } from "../../resources/index.js";
import {
  validateTitle,
  validateContent,
  UnauthorizedError,
  BadRequestError,
  createDataResponse,
  validateChallengeEndAt,
  validateTag,
  createColorsFromTagName,
} from "../../utils/index.js";
import { Op } from "sequelize";

const storeChallenge = async (req, res, next) => {
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

    let { title, content, endAt, tags } = req.body;

    title = validateTitle(title);
    content = validateContent(content);
    endAt = validateChallengeEndAt(endAt);

    if (!Array.isArray(tags))
      throw new BadRequestError({
        message: "tags is not an array",
        code: "E5_",
      });

    tags = tags.map((tag) => validateTag(tag));

    const targetChallenge = await Challenge.create({
      userId: authUser.id,
      title,
      content,
      endAt,
    });

    await targetChallenge.reload();

    const existedTags = await Tag.findAll({
      where: {
        name: {
          [Op.in]: [tags],
        },
      },
    });
    const existedTagsName = existedTags.map((existedTag) => existedTag.name);

    const tagsNameToCreate = tags.filter(
      (tag) => !existedTagsName.includes(tag)
    );

    const newTags = await Tag.bulkCreate(
      tagsNameToCreate.map((name) => {
        const colors = createColorsFromTagName(name);

        return {
          name,
          bgColor: colors.bgColor,
          textColor: colors.textColor,
        };
      })
    );

    await Promise.all(
      newTags.map(async (tag) => {
        await tag.reload();
      })
    );

    await ChallengeTag.bulkCreate(
      existedTags.concat(newTags).map((tag) => ({
        challengeId: targetChallenge.id,
        tagId: tag.id,
      }))
    );

    const targetChallengeResource = challengeResource(targetChallenge);

    const data = {
      challenge: targetChallengeResource,
    };

    const dataResponse = createDataResponse({
      data,
      request: req,
    });

    res.status(201);

    return res.json(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { storeChallenge };

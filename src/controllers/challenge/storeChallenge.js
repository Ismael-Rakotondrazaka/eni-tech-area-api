import { Challenge, User, ChallengeTag } from "../../models/index.js";
import { challengeResource } from "../../resources/index.js";
import {
  validateTitle,
  validateContent,
  UnauthorizedError,
  BadRequestError,
  createDataResponse,
  validateEndAt,
  validateTag,
} from "../../utils/index.js";

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
    endAt = validateEndAt(endAt);

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

    await ChallengeTag.bulkCreate(
      tags.map((tag) => ({
        tagName: tag,
        challengeId: targetChallenge.id,
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

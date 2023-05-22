import {
  Challenge,
  ChallengeAnswer,
  User,
  UserTag,
} from "../../models/index.js";
import { challengeAnswerResource } from "../../resources/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
  ForbiddenError,
  validateChallengeAnswerStatus,
  ConflictError,
} from "../../utils/index.js";
import { challengeConfig } from "../../configs/index.js";

import { Op } from "sequelize";

const verifyChallengeAnswer = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { challengeId, challengeAnswerId } = req.params;
    let { status } = req.body;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (!/^\d+$/.test(challengeId) || !/^\d+$/.test(challengeAnswerId))
      throw new NotFoundError();

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetChallenge = await Challenge.findByPk(challengeId);

    if (!targetChallenge) throw new NotFoundError();

    const challengeOwner = await User.findByPk(targetChallenge.userId);

    if (!challengeOwner) throw new NotFoundError();

    const targetAnswer = await ChallengeAnswer.findOne({
      where: {
        id: challengeAnswerId,
        challengeId: targetChallenge.id,
      },
    });

    if (!targetAnswer) throw new NotFoundError();

    const answerOwner = await User.findByPk(targetAnswer.userId);

    if (!answerOwner) throw new NotFoundError();

    if (challengeOwner.id !== authUser.id)
      throw new ForbiddenError({
        message: "Can not verify answers from a challenge that is not yours",
        code: "E6_",
      });

    if (targetAnswer.status !== challengeConfig.DEFAULT_CHALLENGE_STATUS)
      throw new ConflictError({
        message: "challenge answer is already verified",
        code: "E4_",
      });

    status = validateChallengeAnswerStatus(status);

    await targetAnswer.update({
      status,
    });

    const targetChallengeTags = await targetChallenge.getTags();
    const targetChallengeTagsId = targetChallengeTags.map((tag) => tag.id);

    const answerOwnerUserTags = await UserTag.findAll({
      where: {
        userId: answerOwner.id,
        tagId: {
          [Op.in]: targetChallengeTagsId,
        },
      },
    });

    const swappedChallengeDifficulty = {};
    for (const [key, value] of Object.entries(
      challengeConfig.CHALLENGE_DIFFICULTY
    )) {
      swappedChallengeDifficulty[value] = key;
    }

    const answerPoint =
      challengeConfig.CHALLENGE_DIFFICULTY_POINT[
        swappedChallengeDifficulty[targetChallenge.difficulty]
      ];

    if (status === challengeConfig.CHALLENGE_STATUS_ITEM.SUCCESS) {
      await Promise.all(
        answerOwnerUserTags.map(async (tagUser) => {
          await tagUser.update({
            challengeScore: tagUser.challengeScore + answerPoint,
          });
        })
      );
    } else if (status === challengeConfig.CHALLENGE_STATUS_ITEM.FAILURE) {
      await Promise.all(
        answerOwnerUserTags.map(async (tagUser) => {
          const newScore = tagUser.challengeScore - answerPoint;
          await tagUser.update({
            challengeScore: newScore > 0 ? newScore : 0,
          });
        })
      );
    }

    const targetChallengeAnswerResource = challengeAnswerResource(targetAnswer);

    const data = {
      challengeAnswer: targetChallengeAnswerResource,
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

export { verifyChallengeAnswer };

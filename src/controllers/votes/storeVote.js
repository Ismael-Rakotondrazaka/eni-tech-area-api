import {
  Answer,
  User,
  UserTag,
  Vote,
  QuestionTag,
} from "../../models/index.js";
import { voteResource } from "../../resources/index.js";
import {
  UnauthorizedError,
  ForbiddenError,
  createDataResponse,
  NotFoundError,
  validateVoteType,
  ConflictError,
} from "../../utils/index.js";

const storeVote = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { answerId } = req.params;
    let { type } = req.body;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (!/^\d+$/.test(answerId)) throw new NotFoundError();

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetAnswer = await Answer.findByPk(answerId);

    if (!targetAnswer) throw new NotFoundError();

    if (authUser.id === targetAnswer.id)
      throw new ForbiddenError({
        message: "can't vote your own answer",
        code: "E2_",
      });

    type = validateVoteType(type);

    const targetAnswerer = await User.findByPk(targetAnswer.userId);

    if (!targetAnswerer) throw new NotFoundError();

    const voted = await Vote.findOne({
      where: {
        answerId,
        userId: authUser.id,
      },
    });

    let targetVote;

    if (voted) {
      if (voted.type === type) {
        throw new ConflictError({
          message: `Already vote the answer as ${voted.type}`,
          code: "E6_",
        });
      } else {
        await voted.update({
          type,
        });

        targetVote = voted;
      }
    } else {
      targetVote = await Vote.create({
        answerId,
        userId: authUser.id,
        type,
      });
    }

    const targetAnswerTags = await QuestionTag.findAll({
      where: {
        questionId: targetAnswer.questionId,
      },
    });

    const targetAnswerTagsNames = targetAnswerTags.map((tag) => tag.tagName);

    const targetUserTags = await UserTag.findAll({
      where: {
        userId: targetAnswerer.id,
        tagName: targetAnswerTagsNames,
      },
    });

    if (type === "up") {
      await Promise.all(
        targetUserTags.map(async (tag) => {
          await tag.update({
            score: tag.score + 1,
          });
        })
      );
    } else {
      await Promise.all(
        targetUserTags.map(async (tag) => {
          await tag.update({
            score: tag.score - 1,
          });
        })
      );
    }

    const targetVoteResource = voteResource(targetVote);

    const data = {
      vote: targetVoteResource,
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

export { storeVote };

import { Answer, User, UserTag, Question, Vote } from "../../models/index.js";
import { notificationResource } from "../../resources/notificationResource.js";
import { socketIO } from "../../services/socketIO/index.js";
import {
  UnauthorizedError,
  ForbiddenError,
  createDataResponse,
  NotFoundError,
  validateVoteType,
} from "../../utils/index.js";
import { questionConfig } from "../../configs/index.js";
import { Op } from "sequelize";

const storeVote = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { questionId, answerId } = req.params;
    let { type } = req.body;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (!/^\d+$/.test(answerId) || !/^\d+$/.test(questionId))
      throw new NotFoundError();

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetQuestion = await Question.findByPk(questionId);

    if (!targetQuestion) throw new NotFoundError();

    const targetAnswer = await Answer.findOne({
      where: {
        id: answerId,
        questionId: targetQuestion.id,
      },
    });

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

    // type of voteChange
    let voteChangeType = "update";

    if (voted) {
      if (voted.type === type) {
        await voted.destroy();
        voteChangeType = "delete";
      } else {
        await voted.update({
          type,
        });
      }
    } else {
      await Vote.create({
        answerId,
        userId: authUser.id,
        type,
      });
      voteChangeType = "store";
    }

    const targetQuestionTags = await targetQuestion.getTags();

    const targetQuestionTagsId = targetQuestionTags.map((tag) => tag.id);

    const targetUserTags = await UserTag.findAll({
      where: {
        userId: targetAnswerer.id,
        tagId: {
          [Op.in]: targetQuestionTagsId,
        },
      },
    });

    const votePoint = questionConfig.DEFAULT_SUCCESS_ANSWER_POINT;

    // TODO notify the answerer
    if (voteChangeType === "store") {
      await Promise.all(
        targetUserTags.map(async (tag) => {
          await tag.update({
            questionScore: tag.questionScore + votePoint,
          });
        })
      );

      const voteNotificationType = "vote";
      const questionOwner = await User.findByPk(targetQuestion.userId);
      const answerOwner = await User.findByPk(targetAnswer.userId);

      const notificationContent = {
        type: voteNotificationType,
        questionId: targetQuestion.id,
        questionBy: questionOwner.id,
        answerId: targetAnswer.id,
        answerBy: answerOwner.id,
        initiateBy: authUser.id,
        voteType: type,
      };

      const notification = await Notification.create({
        userId: answerOwner.id,
        content: JSON.stringify(notificationContent),
      });

      const targetNotificationResource = notificationResource(notification);

      const data = {
        notification: targetNotificationResource,
      };

      socketIO.to(answerOwner.channelId).emit("notifications:store", data);
    } else if (voteChangeType === "delete") {
      await Promise.all(
        targetUserTags.map(async (tag) => {
          const newScore = tag.questionScore - votePoint;

          await tag.update({
            questionScore: newScore > 0 ? newScore : 0,
          });
        })
      );
    }

    const upCount = await targetAnswer.countVotes({
      where: {
        type: "up",
      },
    });

    const data = {
      counts: {
        up: upCount,
      },
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

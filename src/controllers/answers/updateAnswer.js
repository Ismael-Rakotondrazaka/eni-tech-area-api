import { Answer, Notification, User, Comment } from "../../models/index.js";
import { answerResource } from "../../resources/answerResource.js";
import { notificationResource } from "../../resources/notificationResource.js";
import { socketIO } from "../../services/socketIO/index.js";
import {
  validateContent,
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";
import { isAuthorizedTo } from "../../policies/index.js";

const updateAnswer = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    let { content } = req.body;
    let { answerId } = req.params;

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

    if (!/^\d+$/.test(answerId)) throw new NotFoundError();
    answerId = +answerId;

    // refetch the answer with user, comments, and votes
    const targetAnswer = await Answer.findOne({
      where: {
        id: answerId,
      },
      include: [
        "user",
        {
          model: Comment,
          as: "comments",
          include: "user",
        },
        "votes",
      ],
    });

    if (!targetAnswer) throw new NotFoundError();

    await isAuthorizedTo({
      user: authUser,
      action: "update",
      source: "Answer",
      target: targetAnswer,
    });

    content = validateContent(content);

    await targetAnswer.update({
      content,
    });

    const targetQuestion = await targetAnswer.getQuestion();

    if (!targetQuestion) throw new NotFoundError();

    const questionOwner = await User.findByPk(targetQuestion.userId);

    await targetAnswer.update({
      content,
    });

    await targetAnswer.reload();

    // the user will receive the notification only when the answerer is not the owner of the question
    const answerNotificationType = "answer";
    if (questionOwner.id !== authUser.id) {
      const notificationContent = {
        type: answerNotificationType,
        questionId: targetQuestion.id,
        questionBy: questionOwner.id,
        initiateBy: authUser.id,
        content,
      };

      const notification = await Notification.create({
        userId: questionOwner.id,
        content: JSON.stringify(notificationContent),
      });

      const targetNotificationResource = notificationResource(notification);

      const data = {
        notification: targetNotificationResource,
      };

      socketIO.to(questionOwner.channelId).emit("notifications:store", data);
    }

    const targetAnswerResource = answerResource(targetAnswer);

    const data = {
      answer: targetAnswerResource,
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

export { updateAnswer };

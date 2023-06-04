import { Answer, Comment, User, Notification } from "../../models/index.js";
import {
  commentResource,
  notificationResource,
} from "../../resources/index.js";
import {
  validateContent,
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";
import { socketIO } from "../../services/socketIO/index.js";

const storeComment = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    let { content, answerId } = req.body;

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
    const targetAnswer = await Answer.findByPk(answerId, {
      include: [
        "user",
        {
          association: "question",
          include: ["user"],
        },
      ],
    });

    if (!targetAnswer) throw new NotFoundError();

    content = validateContent(content);

    const commentCreated = await Comment.create({
      userId: authUser.id,
      answerId: targetAnswer.id,
      content,
    });

    const targetComment = await Comment.findByPk(commentCreated.id, {
      include: ["user"],
    });

    const commentNotificationType = "comment";

    const questionOwner = targetAnswer.question.user;
    const targetQuestion = targetAnswer.question;
    const answerOwner = targetAnswer.user;

    const notificationContent = {
      type: commentNotificationType,
      questionId: targetQuestion.id,
      questionBy: questionOwner.id,
      answerId: targetAnswer.id,
      answerBy: answerOwner.id,
      initiateBy: authUser.id,
      content,
    };

    if (questionOwner.id !== authUser.id) {
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

    if (answerOwner.id !== authUser.id) {
      const notification = await Notification.create({
        userId: questionOwner.id,
        content: JSON.stringify(notificationContent),
      });

      const targetNotificationResource = notificationResource(notification);

      const data = {
        notification: targetNotificationResource,
      };

      socketIO.to(answerOwner.channelId).emit("notifications:store", data);
    }

    const targetCommentResource = commentResource(targetComment);

    const data = {
      comment: targetCommentResource,
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

export { storeComment };

import { Comment, User, Notification } from "../../models/index.js";
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
import { isAuthorizedTo } from "../../policies/index.js";

const updateComment = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    let { content } = req.body;
    let { commentId } = req.params;

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

    if (!/^\d+$/.test(commentId)) throw new NotFoundError();
    commentId = +commentId;
    const targetComment = await Comment.findByPk(commentId, {
      include: [
        "user",
        {
          association: "answer",
          include: [
            "user",
            {
              association: "question",
              include: ["user"],
            },
          ],
        },
      ],
    });
    if (!targetComment) throw new NotFoundError();

    await isAuthorizedTo({
      user: authUser,
      action: "update",
      source: "Comment",
      target: targetComment,
    });

    content = validateContent(content);

    await targetComment.update({
      content,
    });

    const commentNotificationType = "comment";

    const questionOwner = targetComment.answer.question.user;
    const targetQuestion = targetComment.answer.question;
    const answerOwner = targetComment.answer.user;

    const notificationContent = {
      type: commentNotificationType,
      questionId: targetQuestion.id,
      questionBy: questionOwner.id,
      answerId: targetComment.id,
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

    return res.json(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { updateComment };

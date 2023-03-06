import { ChallengeAnswer, Notification, Challenge, User } from "../../models/index.js";
import { challengeAnswerResource } from "../../resources/index.js";
import { notificationResource } from "../../resources/notificationResource.js";
import { socketIO } from "../../services/socketIO/index.js";
import {
  validateContent,
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";

const storeChallengeAnswer = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { challengeId } = req.params;
    let { content } = req.body;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (!/\d+$/.test(challengeId)) throw new NotFoundError();

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetChallenge = await Challenge.findByPk(challengeId);

    if (!targetChallenge) throw new NotFoundError();

    const challengeOwner = await User.findByPk(targetChallenge.userId);

    content = validateContent(content);

    const challengeAnswerNotificationType = "challengeAnswer";

    const targetChallengeAnswer = await ChallengeAnswer.create({
      userId: authUser.id,
      challengeId: targetChallenge.id,
      content,
    });

    await targetChallengeAnswer.reload();

    // the user will receive the notification only when the ansewerer is not the owner of the question
    if (challengeOwner.id !== authUser.id) {
      const notificationContent = {
        type: challengeAnswerNotificationType,
        challengeId: targetChallenge.id,
        challengeBy: challengeOwner.id,
        initiateBy: authUser.id,
        content,
      };

      const notification = await Notification.create({
        userId: challengeOwner.id,
        content: JSON.stringify(notificationContent),
      });

      const targetNotificationResource = notificationResource(notification);

      const data = {
        notification: targetNotificationResource,
      };

      socketIO.to(challengeOwner.channelId).emit("notifications:store", data);
    }

    const targetChallengeAnswerResource = challengeAnswerResource(targetChallengeAnswer);

    const data = {
      challengeAnswer: targetChallengeAnswerResource,
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

export { storeChallengeAnswer };

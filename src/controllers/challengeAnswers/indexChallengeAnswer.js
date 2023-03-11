import { Challenge, ChallengeAnswer, User } from "../../models/index.js";
import { challengeAnswerCollection } from "../../resources/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";
import { challengeConfig } from "../../configs/index.js";

const indexChallengeAnswer = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { challengeId } = req.params;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (!/^\d+$/.test(challengeId)) throw new NotFoundError();

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

    // we mark pending responses to failure if the challenge reach his end

    const isChallengeEnded = targetChallenge.endAt.getTime() <= Date.now();

    let targetChallengeAnswerCollection = [];

    if (isChallengeEnded || challengeOwner.id === authUser.id) {
      if (isChallengeEnded) {
        await ChallengeAnswer.update(
          {
            status: challengeConfig.CHALLENGE_STATUS_ITEM.FAILURE,
          },
          {
            where: {
              status: challengeConfig.CHALLENGE_STATUS_ITEM.PENDING,
            },
          }
        );
      }

      const targetChallengeAnswers = await targetChallenge.getChallengeAnswers({
        order: [["createdAt", "ASC"]],
      });

      targetChallengeAnswerCollection = challengeAnswerCollection(
        targetChallengeAnswers
      );
    }

    const data = {
      challengeAnswers: targetChallengeAnswerCollection,
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

export { indexChallengeAnswer };

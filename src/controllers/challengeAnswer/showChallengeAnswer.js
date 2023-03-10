import { Challenge, ChallengeAnswer, User } from "../../models/index.js";
import { challengeAnswerResource } from "../../resources/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";

const showChallengeAnswer = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { challengeId, challengeAnswerId } = req.params;

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

    const isChallengeEnded = targetChallenge.endAt.getTime() <= Date.now();

    let targetChallengeAnswerResource = null;

    if (isChallengeEnded || challengeOwner.id === authUser.id) {
      // we mark pending responses to failure if the challenge reach his end
      if (isChallengeEnded) {
        await ChallengeAnswer.update(
          {
            status: "failure",
          },
          {
            where: {
              status: "pending",
            },
          }
        );
      }

      const targetChallengeAnswer = await ChallengeAnswer.findOne({
        where: {
          id: challengeAnswerId,
          challengeId: targetChallenge.id,
        },
      });

      if (targetChallengeAnswer) {
        targetChallengeAnswerResource = challengeAnswerResource(
          targetChallengeAnswer
        );
      }
    }

    if (!targetChallengeAnswerResource) throw new NotFoundError();

    const data = {
      challengeAnswers: targetChallengeAnswerResource,
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

export { showChallengeAnswer };

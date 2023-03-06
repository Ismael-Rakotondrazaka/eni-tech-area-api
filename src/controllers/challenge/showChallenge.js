import { Challenge, User } from "../../models/index.js";
import { challengeResource } from "../../resources/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";

const showChallenge = async (req, res, next) => {
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

    const { challengeId } = req.params;

    if (!/\d+/.test(challengeId)) throw new NotFoundError();

    const targetChallenge = await Challenge.findByPk(+challengeId);

    if (!targetChallenge) throw new NotFoundError();

    const targetChallengeResource = challengeResource(targetChallenge);

    const data = {
      challenge: targetChallengeResource,
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

export { showChallenge };

import { ChallengeAnswer, User } from "../../models/index.js";
import { challengeAnswerCollection } from "../../resources/index.js";
import { UnauthorizedError, createDataResponse } from "../../utils/index.js";

const indexChallengeAnswer = async (req, res, next) => {
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

    const targetChallengeAnswer = await ChallengeAnswer.findAll();

    const targetChallengeAnswerCollection = challengeAnswerCollection(targetChallengeAnswer);

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

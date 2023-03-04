import { Answer, Question, User } from "../../models/index.js";
import { answerCollection } from "../../resources/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";

const indexAnswer = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { questionId } = req.params;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (!/^\d+$/.test(questionId)) throw new NotFoundError();

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetQuestion = await Question.findByPk(questionId);

    if (!targetQuestion) throw new NotFoundError();

    const targetAnswers = await Answer.findAll({
      where: {
        questionId: targetQuestion.id,
      },
    });

    const targetAnswersResource = answerCollection(targetAnswers);

    const data = {
      answers: targetAnswersResource,
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

export { indexAnswer };

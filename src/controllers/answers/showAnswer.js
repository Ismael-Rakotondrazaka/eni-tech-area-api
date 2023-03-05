import { Question, User, Answer } from "../../models/index.js";
import { answerResource } from "../../resources/answerResource.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";

const showAnswer = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { questionId, answerId } = req.params;

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

    if (!/\d+/.test(questionId) || !/\d+/.test(answerId))
      throw new NotFoundError();

    const targetQuestion = await Question.findByPk(+questionId);

    if (!targetQuestion) throw new NotFoundError();

    const targetAnswer = await Answer.findOne({
      where: {
        id: +answerId,
        questionId: +questionId,
      },
    });

    if (!targetAnswer) throw new NotFoundError();

    const targetAnswerResource = answerResource(targetAnswer);

    const data = {
      answer: targetAnswerResource,
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

export { showAnswer };

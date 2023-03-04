import { Answer, Question, User } from "../../models/index.js";
import { answerResource } from "../../resources/answerResource.js";
import {
  validateContent,
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";

const storeAnswer = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { questionId } = req.params;
    let { content } = req.body;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (!/\d+$/.test(questionId)) throw new NotFoundError();

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetQuestion = await Question.findByPk(questionId);

    if (!targetQuestion) throw new NotFoundError();

    content = validateContent(content);

    const targetAnswer = await Answer.create({
      userId: authUser.id,
      questionId: targetQuestion.id,
      content,
    });

    await targetAnswer.reload();

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

export { storeAnswer };

import { Answer, User, Vote, Question } from "../../models/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";

const indexVoteCount = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { questionId, answerId } = req.params;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });
    console.log("here");

    if (!/^\d+$/.test(questionId) || !/^\d+$/.test(answerId))
      throw new NotFoundError();

    const authUser = await User.findByPk(+authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetQuestion = await Question.findByPk(+questionId);

    if (!targetQuestion) throw new NotFoundError();

    const targetAnswer = await Answer.findOne({
      where: {
        id: +answerId,
        questionId: targetQuestion.id,
      },
    });

    if (!targetAnswer) throw new NotFoundError();

    const upCount = await Vote.count({
      where: {
        type: "up",
      },
    });

    const downCount = await Vote.count({
      where: {
        type: "down",
      },
    });

    const data = {
      counts: {
        up: upCount,
        down: downCount,
      },
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

export { indexVoteCount };

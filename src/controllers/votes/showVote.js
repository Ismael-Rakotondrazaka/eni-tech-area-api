import { Answer, User, Vote, Question } from "../../models/index.js";
import { voteResource } from "../../resources/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";

const showVote = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { questionId, answerId, voteId } = req.params;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (
      !/^\d+$/.test(questionId) ||
      !/^\d+$/.test(answerId) ||
      !/^\d+$/.test(voteId)
    )
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

    const targetVote = await Vote.findOne({
      where: {
        id: +voteId,
        answerId: targetAnswer.id,
        userId: authUser.id,
      },
    });

    if (!targetVote) throw new NotFoundError();

    const targetVoteResource = voteResource(targetVote);

    const data = {
      vote: targetVoteResource,
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

export { showVote };

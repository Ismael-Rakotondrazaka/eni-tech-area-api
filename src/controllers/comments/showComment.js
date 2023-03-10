import { Answer, Comment, Question, User } from "../../models/index.js";
import { commentResource } from "../../resources/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";

const showComment = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { questionId, answerId, commentId } = req.params;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (
      !/^\d+$/.test(questionId) ||
      !/^\d+$/.test(answerId) ||
      !/^\d+$/.test(commentId)
    )
      throw new NotFoundError();

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetQuestion = await Question.findByPk(questionId);

    if (!targetQuestion) throw new NotFoundError();

    const targetAnswer = await Answer.findByOne({
      where: {
        id: answerId,
        questionId,
      },
    });

    if (!targetAnswer) throw new NotFoundError();

    const targetComment = await Comment.findOne({
      where: {
        id: commentId,
        answerId,
      },
    });

    const targetCommentResource = commentResource(targetComment);

    const data = {
      comment: targetCommentResource,
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

export { showComment };

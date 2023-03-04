import { Answer, Comment, Question, User } from "../../models/index.js";
import { commentResource } from "../../resources/index.js";
import {
  validateContent,
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";

const storeComment = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { questionId, answerId } = req.params;
    let { content } = req.body;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (!/^\d+$/.test(questionId) || !/^\d+$/.test(answerId))
      throw new NotFoundError();

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetQuestion = await Question.findByPk(questionId);

    if (!targetQuestion) throw new NotFoundError();

    const targetAnswer = await Answer.findOne({
      where: {
        id: answerId,
        questionId,
      },
    });

    if (!targetAnswer) throw new NotFoundError();

    content = validateContent(content);

    const targetComment = await Comment.create({
      userId: authUser.id,
      answerId: targetQuestion.id,
      content,
    });

    await targetComment.reload();

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

export { storeComment };

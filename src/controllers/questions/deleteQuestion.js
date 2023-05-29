import { Question, User } from "../../models/index.js";
import {
  NotFoundError,
  UnauthorizedError,
  createDataResponse,
} from "../../utils/index.js";

const deleteQuestion = async (req, res, next) => {
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

    const { questionId } = req.params;

    if (!/^\d+$/.test(questionId)) throw new NotFoundError();

    const targetQuestion = await Question.findByPk(+questionId);

    if (!targetQuestion) throw new NotFoundError();

    await targetQuestion.destroy();

    return res.json(
      createDataResponse({
        data: {
          message: `Question ${questionId} deleted successfully`,
        },
        request: req,
      })
    );
  } catch (error) {
    next(error);
  }
};

export { deleteQuestion };

import { User, Question } from "../../models/index.js";
import { UnauthorizedError, NotFoundError } from "../../utils/errors/index.js";
import { createDataResponse } from "../../utils/responses/index.js";
import { questionCollection } from "../../resources/index.js";

const indexUserQuestion = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { userId: targetUserId } = req.params;

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

    const targetUser = await User.findByPk(targetUserId);

    if (!targetUser) throw new NotFoundError();

    const targetUserQuestion = await Question.findAll({
      where: {
        userId: authUser.id,
      },
    });

    const targetUserQuestionResource = questionCollection(targetUserQuestion);

    const data = {
      questions: targetUserQuestionResource,
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

export { indexUserQuestion };

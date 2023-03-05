import { Op } from "sequelize";
import { Question, User, QuestionTag } from "../../models/index.js";
import { questionCollection } from "../../resources/index.js";
import { UnauthorizedError, createDataResponse } from "../../utils/index.js";

const indexQuestionSuggestion = async (req, res, next) => {
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

    const targetTags = await authUser.getUserTags();

    const targetQuestions = await Question.findAll({
      where: {
        userId: {
          [Op.not]: authUser.id,
        },
      },
      include: [
        {
          model: QuestionTag,
          where: {
            tagName: {
              [Op.in]: targetTags.map((tag) => tag.tagName),
            },
          },
        },
      ],
    });

    const targetQuestionsCollection = questionCollection(targetQuestions);

    const data = {
      questions: targetQuestionsCollection,
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

export { indexQuestionSuggestion };

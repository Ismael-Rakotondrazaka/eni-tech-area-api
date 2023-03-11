import { Op } from "sequelize";
import { Question, User, Tag } from "../../models/index.js";
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

    const targetTags = await authUser.getTags();

    // console.log(targetTags);

    const targetQuestions = await Question.findAll({
      where: {
        userId: {
          [Op.not]: authUser.id,
        },
      },
      include: [
        {
          model: Tag,
          where: {
            name: {
              [Op.in]: targetTags.map((tag) => tag.name),
            },
          },
        },
      ],
      order: [["createdAt", "DESC"]],
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

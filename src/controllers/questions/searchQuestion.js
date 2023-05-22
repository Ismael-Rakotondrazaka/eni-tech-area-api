import { Op } from "sequelize";
import { Question, Tag, User } from "../../models/index.js";
import { questionCollection } from "../../resources/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  BadRequestError,
} from "../../utils/index.js";

const searchQuestion = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { title, content, both, tagName } = req.query;

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

    if (!(title || content || both || tagName))
      throw new BadRequestError({
        message: "query parameters missing",
        code: "E2_",
      });

    let targetQuestions = [];

    if (title) {
      targetQuestions = await Question.findAll({
        where: {
          title: {
            [Op.substring]: title,
          },
        },
        order: [["createdAt", "DESC"]],
      });
    } else if (content) {
      targetQuestions = await Question.findAll({
        where: {
          content: {
            [Op.substring]: content,
          },
        },
        order: [["createdAt", "DESC"]],
      });
    } else if (both) {
      targetQuestions = await Question.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.substring]: both,
              },
            },
            {
              content: {
                [Op.substring]: both,
              },
            },
          ],
        },
        order: [["createdAt", "DESC"]],
      });
    } else {
      targetQuestions = await Question.findAll({
        include: [
          {
            model: Tag,
            where: {
              name: tagName.toUpperCase(),
            },
          },
        ],
        order: [["createdAt", "DESC"]],
      });
    }

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

export { searchQuestion };

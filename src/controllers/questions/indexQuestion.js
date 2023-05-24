import { Question, Tag } from "../../models/index.js";
import { questionCollection } from "../../resources/index.js";
import { getPagination } from "../../utils/getPagination.js";
import { NotFoundError, createDataResponse } from "../../utils/index.js";
import questionFilter from "../../utils/filters/questionFilter.js";

const indexQuestion = async (req, res, next) => {
  const page = parseInt(req.query.page || 1);
  const orderDirection = req.query.orderDirection || "ASC";
  const size = 8;
  try {
    if (page <= 0) {
      throw new NotFoundError({ message: "Invalid page provided" });
    }
    const whereQuery = questionFilter.getQuestionFilters(req);
    const whereTagQuery = questionFilter.getQuestionTagFilters(req);

    const { count, rows } = await Question.findAndCountAll({
      order: [["createdAt", orderDirection]],
      where: {
        ...whereQuery,
      },
      include: [
        "user",
        {
          model: Tag,
          as: "tags",
          where: {
            ...whereTagQuery,
          },
        },
        "answers",
      ],
      distinct: true, // to get the right quatity of questions
      offset: size * (page - 1),
      limit: size,
    });

    let data = {
      questions: [],
    };
    if (count === 0) {
      const dataResponse = createDataResponse({
        data,
        request: req,
      });

      return res.json(dataResponse);
    } else {
      const targetQuestionsCollection = questionCollection(rows);

      data = {
        ...getPagination(count, size, page),
        questions: targetQuestionsCollection,
      };

      const dataResponse = createDataResponse({
        data,
        request: req,
      });

      return res.json(dataResponse);
    }
  } catch (error) {
    next(error);
  }
};

export { indexQuestion };

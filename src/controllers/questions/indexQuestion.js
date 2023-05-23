import { Question } from "../../models/index.js";
import { questionCollection } from "../../resources/index.js";
import { getPagination } from "../../utils/getPagination.js";
import { NotFoundError, createDataResponse } from "../../utils/index.js";

const indexQuestion = async (req, res, next) => {
  const page = parseInt(req.query.page || 1);
  const size = 8;
  try {
    if (page <= 0) {
      throw new NotFoundError({ message: "Invalid page provided" });
    }

    const { count, rows } = await Question.findAndCountAll({
      include: ["user", "tags", "answers"],
      distinct: true, // to get the right quatity of questions
      offset: size * (page - 1),
      limit: size,
    });

    const targetQuestionsCollection = questionCollection(rows);

    const data = {
      ...getPagination(count, size, page),
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

export { indexQuestion };

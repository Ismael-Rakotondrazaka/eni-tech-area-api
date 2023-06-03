import { Answer, Comment } from "../../models/index.js";
import { answerCollection } from "../../resources/index.js";
import { createDataResponse, NotFoundError } from "../../utils/index.js";
import { answerFilter } from "../../utils/filters/index.js";
import { getPagination } from "../../utils/getPagination.js";

const indexAnswer = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || 1);
    const orderDirection = req.query.orderDirection || "ASC";
    const size = 8;

    if (page <= 0) {
      throw new NotFoundError({ message: "Invalid page provided" });
    }

    const whereQuery = answerFilter.getAnswerFilters(req);

    const { count, rows } = await Answer.findAndCountAll({
      where: {
        ...whereQuery,
      },
      include: [
        "user",
        {
          model: Comment,
          as: "comments",
          include: "user",
        },
        "votes",
      ],
      order: [["createdAt", orderDirection]],
      offset: size * (page - 1),
      limit: size,
    });

    let data = {
      answers: [],
    };

    if (count > 0) {
      const targetAnswersCollection = answerCollection(rows);

      data = {
        ...getPagination(count, size, page),
        answers: targetAnswersCollection,
      };
    }

    const dataResponse = createDataResponse({
      data,
      request: req,
    });

    return res.json(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { indexAnswer };

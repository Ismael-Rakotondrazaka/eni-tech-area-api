import { Comment } from "../../models/index.js";
import { commentCollection } from "../../resources/index.js";
import { NotFoundError, createDataResponse } from "../../utils/index.js";
import { commentFilter } from "../../utils/filters/index.js";
import { getPagination } from "../../utils/getPagination.js";

const indexComment = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || 1);
    const orderDirection = req.query.orderDirection || "ASC";
    const size = 8;

    if (page <= 0) {
      throw new NotFoundError({ message: "Invalid page provided" });
    }

    const whereQuery = commentFilter.getCommentFilters(req);

    const { count, rows } = await Comment.findAndCountAll({
      where: {
        ...whereQuery,
      },
      include: ["user"],
      order: [["createdAt", orderDirection]],
      offset: size * (page - 1),
      limit: size,
    });

    let data = {
      answers: [],
    };

    if (count > 0) {
      const targetAnswersCollection = commentCollection(rows);

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

export { indexComment };

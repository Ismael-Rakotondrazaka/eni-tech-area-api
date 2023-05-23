import { Answer, Comment } from "../../models/index.js";
import { commentCollection } from "../../resources/index.js";
import { NotFoundError, createDataResponse } from "../../utils/index.js";

const indexComment = async (req, res, next) => {
  try {
    const answerId = req.query.answerId;

    const targetAnswer = await Answer.findByPk(+answerId);

    if (!targetAnswer) throw new NotFoundError({ message: "Answer not found" });

    const targetComments = await Comment.findAll({
      where: {
        answerId,
      },
      order: [["createdAt", "ASC"]],
      include: "user",
    });

    const targetCommentsResource = commentCollection(targetComments);

    const data = {
      comments: targetCommentsResource,
    };

    const dataResponse = createDataResponse({
      data,
      request: req,
    });

    res.status(200);

    return res.json(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { indexComment };

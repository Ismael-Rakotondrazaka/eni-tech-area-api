import { Comment } from "../../models/index.js";
import { commentResource } from "../../resources/index.js";
import { createDataResponse, NotFoundError } from "../../utils/index.js";

const showComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    if (!/^\d+$/.test(commentId)) throw new NotFoundError();

    const targetComment = await Comment.findByPk(commentId, {
      include: ["user"],
    });

    const targetCommentResource = commentResource(targetComment);

    const data = {
      comment: targetCommentResource,
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

export { showComment };

import { Comment, User } from "../../models/index.js";
import {
  createDataResponse,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/index.js";
import { isAuthorizedTo } from "../../policies/index.js";

const destroyComment = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { commentId } = req.params;

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

    if (!/^\d+$/.test(commentId)) throw new NotFoundError();

    const targetComment = await Comment.findByPk(commentId);

    if (!targetComment) throw new NotFoundError();

    const data = {
      message: `Comment ${commentId} deleted successfully`,
    };

    await isAuthorizedTo({
      user: authUser,
      action: "destroy",
      source: "Comment",
      target: targetComment,
    });

    const dataResponse = createDataResponse({
      data,
      request: req,
    });

    return res.json(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { destroyComment };

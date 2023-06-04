import { Answer, User } from "../../models/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
} from "../../utils/index.js";
import { isAuthorizedTo } from "../../policies/index.js";

const destroyAnswer = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    let { answerId } = req.params;

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

    if (!/^\d+$/.test(answerId)) throw new NotFoundError();
    answerId = +answerId;

    const targetAnswer = await Answer.findByPk(answerId);

    if (!targetAnswer) throw new NotFoundError();

    await isAuthorizedTo({
      user: authUser,
      action: "destroy",
      source: "Answer",
      target: targetAnswer,
    });

    await targetAnswer.destroy();

    const data = {
      message: `Answer ${answerId} deleted successfully`,
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

export { destroyAnswer };

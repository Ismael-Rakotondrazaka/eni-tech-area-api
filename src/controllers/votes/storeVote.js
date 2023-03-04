import { Answer, User, Vote } from "../../models/index.js";
import { voteResource } from "../../resources/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  NotFoundError,
  validateVoteType,
  ConflictError,
} from "../../utils/index.js";

const storeVote = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { answerId } = req.params;
    let { type } = req.body;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (!/^\d+$/.test(answerId)) throw new NotFoundError();

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetAnswer = await Answer.findByPk(answerId);

    if (!targetAnswer) throw new NotFoundError();

    type = validateVoteType(type);

    const voted = await Vote.findOne({
      where: {
        answerId,
        userId: authUser.id,
      },
    });

    let targetVote;

    if (voted) {
      if (voted.type === type) {
        throw new ConflictError({
          message: `Already vote the answer as ${voted.type}`,
          code: "E4_",
        });
      } else {
        await voted.update({
          type,
        });

        targetVote = voted;
      }
    } else {
      targetVote = await Vote.create({
        answerId,
        userId: authUser.id,
        type,
      });
    }

    const targetVoteResource = voteResource(targetVote);

    const data = {
      vote: targetVoteResource,
    };

    const dataResponse = createDataResponse({
      data,
      request: req,
    });

    res.status(201);

    return res.json(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { storeVote };

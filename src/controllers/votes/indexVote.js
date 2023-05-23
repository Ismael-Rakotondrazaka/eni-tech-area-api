import { Answer } from "../../models/index.js";
import { createDataResponse, NotFoundError } from "../../utils/index.js";

const indexVote = async (req, res, next) => {
  try {
    const { answerId } = req.query;

    if (!/^\d+$/.test(answerId)) throw new NotFoundError();

    const targetAnswer = await Answer.findOne({
      where: {
        id: +answerId,
      },
    });

    if (!targetAnswer) throw new NotFoundError();

    const upCount = await targetAnswer.countVotes({
      where: {
        type: "up",
      },
    });

    const downCount = await targetAnswer.countVotes({
      where: {
        type: "down",
      },
    });

    const data = {
      votes: {
        up: upCount,
        down: downCount,
      },
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

export { indexVote };

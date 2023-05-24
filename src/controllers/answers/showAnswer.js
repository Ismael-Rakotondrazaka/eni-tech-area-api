import { Answer, Comment } from "../../models/index.js";
import { answerResource } from "../../resources/answerResource.js";
import { createDataResponse, NotFoundError } from "../../utils/index.js";

const showAnswer = async (req, res, next) => {
  try {
    const { answerId } = req.params;

    if (!/^\d+$/.test(answerId)) throw new NotFoundError();

    const targetAnswer = await Answer.findOne({
      where: {
        id: +answerId,
      },
      include: [
        {
          model: Comment,
          as: "comments",
          include: "user",
        },
        "votes",
      ],
    });

    if (!targetAnswer) throw new NotFoundError();

    const targetAnswerResource = answerResource(targetAnswer);

    const data = {
      answer: targetAnswerResource,
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

export { showAnswer };

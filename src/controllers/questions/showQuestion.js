import { Question } from "../../models/index.js";
import { questionResource } from "../../resources/questionResource.js";
import { createDataResponse, NotFoundError } from "../../utils/index.js";

const showQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;

    if (!/^\d+$/.test(questionId)) throw new NotFoundError();

    const targetQuestion = await Question.findByPk(+questionId, {
      include: ["user", "tags", "answers"],
    });

    if (!targetQuestion) throw new NotFoundError();

    const targetQuestionResource = questionResource(targetQuestion);

    const data = {
      question: targetQuestionResource,
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

export { showQuestion };

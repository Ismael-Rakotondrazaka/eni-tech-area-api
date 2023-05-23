import { Question } from "../../models/index.js";
import { questionCollection } from "../../resources/index.js";
import { createDataResponse } from "../../utils/index.js";

const indexQuestion = async (req, res, next) => {
  try {
    const targetQuestions = await Question.findAll({
      order: [["createdAt", "DESC"]],
      include: ["user", "tags", "answers"],
    });

    const targetQuestionsCollection = questionCollection(targetQuestions);

    const data = {
      questions: targetQuestionsCollection,
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

export { indexQuestion };

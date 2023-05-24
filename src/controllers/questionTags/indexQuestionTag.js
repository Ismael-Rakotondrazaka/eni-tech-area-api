import { Question } from "../../models/index.js";
import { NotFoundError } from "../../utils/errors/index.js";
import { createDataResponse } from "../../utils/responses/index.js";
import { questionTagCollection } from "../../resources/index.js";

const indexQuestionTag = async (req, res, next) => {
  try {
    let { questionId } = req.params;

    if (!/^\d+$/.test(questionId)) throw new NotFoundError();

    questionId = +questionId;

    const targetQuestion = await Question.findByPk(questionId);

    if (!targetQuestion) throw new NotFoundError();

    const targetTags = await targetQuestion.getTags({
      order: [["name", "ASC"]],
    });

    const targetTagsResource = questionTagCollection(targetTags);

    const data = {
      tags: targetTagsResource,
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

export { indexQuestionTag };

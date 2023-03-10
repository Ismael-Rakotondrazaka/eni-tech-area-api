import { User, Question } from "../../models/index.js";
import { UnauthorizedError, NotFoundError } from "../../utils/errors/index.js";
import { createDataResponse } from "../../utils/responses/index.js";
import { questionTagCollection } from "../../resources/index.js";

const indexQuestionTag = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    let { questionId } = req.params;

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

    if (!/^\d+$/.test(questionId)) throw new NotFoundError();

    questionId = +questionId;

    const targetQuestion = await Question.findByPk(questionId);

    if (!targetQuestion) throw new NotFoundError();

    const targetTags = await targetQuestion.getTags();

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

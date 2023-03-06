import { Question, QuestionTag, User } from "../../models/index.js";
import { questionResource } from "../../resources/questionResource.js";
import {
  validateTitle,
  validateContent,
  UnauthorizedError,
  BadRequestError,
  createDataResponse,
  validateTag,
} from "../../utils/index.js";

const storeQuestion = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;

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

    let { title, content, tags } = req.body;

    title = validateTitle(title);
    content = validateContent(content);

    if (!Array.isArray(tags))
      throw new BadRequestError({
        message: "tags is not an array",
        code: "E5_",
      });

    tags = tags.map((tag) => validateTag(tag));

    const targetQuestion = await Question.create({
      userId: authUser.id,
      title,
      content,
    });

    await targetQuestion.reload();

    await QuestionTag.bulkCreate(
      tags.map((tag) => ({
        tagName: tag,
        userId: authUser.id,
      }))
    );

    const targetQuestionResource = questionResource(targetQuestion);

    const data = {
      question: targetQuestionResource,
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

export { storeQuestion };

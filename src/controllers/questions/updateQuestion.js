import { Op } from "sequelize";
import { Question, QuestionTag, Tag, User } from "../../models/index.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  createDataResponse,
  createRadomColor,
  validateContent,
  validateTag,
  validateTitle,
} from "../../utils/index.js";
import { questionResource } from "../../resources/questionResource.js";

const updateQuestion = async (req, res, next) => {
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

    const { questionId } = req.params;

    if (!/^\d+$/.test(questionId)) throw new NotFoundError();

    const targetQuestion = await Question.findByPk(+questionId);

    if (!targetQuestion) throw new NotFoundError();

    let { title, content, tags } = req.body;

    title = validateTitle(title);
    content = validateContent(content);

    if (!Array.isArray(tags))
      throw new BadRequestError({
        message: "tags is not an array",
        code: "E2_",
      });

    /**
     * This is tag name array is supposed to be
     * the new tags for the current question
     */
    tags = tags.map((tag) => validateTag(tag));

    targetQuestion.set({
      title,
      content,
    });

    await targetQuestion.save();

    /**
     * First, we need to get all the current question tags
     */
    const currentQuestionTags = await targetQuestion.getTags();
    const currentQuestionTagsName = currentQuestionTags?.map((tag) => tag.name);

    /**
     * Then, we need to get all the question tags to be delete and add
     */
    const questionTagsNameToBeDelete = currentQuestionTagsName?.filter(
      (tagName) => !tags.includes(tagName)
    );

    const questionTagsToBeDelete = await Tag.findAll({
      where: {
        name: {
          [Op.in]: questionTagsNameToBeDelete,
        },
      },
    });

    await QuestionTag.destroy({
      where: {
        [Op.and]: [
          {
            questionId,
          },
          {
            tagId: {
              [Op.in]: questionTagsToBeDelete.map((tag) => tag.id),
            },
          },
        ],
      },
    });

    const questionTagsNameToBeAdd = tags?.filter(
      (tag) => !currentQuestionTagsName?.includes(tag)
    );

    /**
     * Then, we need to know what tags in the `questionTagsNameToBeAdd`
     * are already in the database and what are not.
     * We create the tags that not there
     */
    const allExistingTags = await Tag.findAll({
      where: {
        name: {
          [Op.in]: questionTagsNameToBeAdd,
        },
      },
    });
    const allExistingTagsName = allExistingTags.map((tag) => tag.name);

    const tagsNeedToBeCreate = questionTagsNameToBeAdd.filter(
      (tagName) => !allExistingTagsName.includes(tagName)
    );

    /**
     * We create the new tags
     */
    const newTags = await Tag.bulkCreate(
      tagsNeedToBeCreate.map((name) => {
        return {
          name,
          bgColor: createRadomColor(),
          textColor: "white",
        };
      })
    );

    await Promise.all(
      newTags.map(async (tag) => {
        await tag.reload();
      })
    );

    await QuestionTag.bulkCreate(
      allExistingTags.concat(newTags).map((tag) => ({
        questionId: targetQuestion.id,
        tagId: tag.id,
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

export { updateQuestion };

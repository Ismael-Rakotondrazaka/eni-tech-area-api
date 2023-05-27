import { Question, QuestionTag, User, Tag } from "../../models/index.js";
import { questionResource } from "../../resources/questionResource.js";
import {
  validateTitle,
  validateContent,
  UnauthorizedError,
  BadRequestError,
  createDataResponse,
  validateTag,
  createRadomColor,
} from "../../utils/index.js";

import { Op } from "sequelize";

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
        code: "E2_",
      });

    tags = tags.map((tag) => validateTag(tag));

    const targetQuestion = await Question.create({
      userId: authUser.id,
      title,
      content,
    });

    await targetQuestion.reload();

    const existedTags = await Tag.findAll({
      where: {
        name: {
          [Op.in]: [tags],
        },
      },
    });
    const existedTagsName = existedTags.map((existedTag) => existedTag.name);

    const tagsNameToCreate = tags.filter(
      (tag) => !existedTagsName.includes(tag)
    );

    const newTags = await Tag.bulkCreate(
      tagsNameToCreate.map((name) => {
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
      existedTags.concat(newTags).map((tag) => ({
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

export { storeQuestion };

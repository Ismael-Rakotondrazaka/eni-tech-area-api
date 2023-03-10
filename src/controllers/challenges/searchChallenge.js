import { Challenge, Tag, User } from "../../models/index.js";
import { challengeCollection } from "../../resources/index.js";
import {
  UnauthorizedError,
  createDataResponse,
  BadRequestError,
} from "../../utils/index.js";
import { Op } from "sequelize";

const searchChallenge = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { title, question, both, tagName } = req.query;

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

    if (!(title || question || both || tagName))
      throw new BadRequestError({
        message: "query parameters missing",
        code: "E2_",
      });

    let targetChallenges = [];

    if (title) {
      targetChallenges = await Challenge.findAll({
        where: {
          title: {
            [Op.substring]: title,
          },
        },
      });
    } else if (question) {
      targetChallenges = await Challenge.findAll({
        where: {
          question: {
            [Op.substring]: question,
          },
        },
      });
    } else if (both) {
      targetChallenges = await Challenge.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.substring]: both,
              },
            },
            {
              question: {
                [Op.substring]: both,
              },
            },
          ],
        },
      });
    } else {
      targetChallenges = await Challenge.findAll({
        include: [
          {
            model: Tag,
            where: {
              name: tagName.toUpperCase(),
            },
          },
        ],
      });
    }

    const targetQuestionsCollection = challengeCollection(targetChallenges);

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

export { searchChallenge };

import { Op } from "sequelize";
import { Challenge, User, Tag } from "../../models/index.js";
import { challengeCollection } from "../../resources/index.js";
import { UnauthorizedError, createDataResponse } from "../../utils/index.js";

const indexChallengeSuggestion = async (req, res, next) => {
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

    const targetTags = await authUser.getTags();

    // console.log(targetTags);

    const targetChallenges = await Challenge.findAll({
      where: {
        userId: {
          [Op.not]: authUser.id,
        },
      },
      include: [
        {
          model: Tag,
          where: {
            name: {
              [Op.in]: targetTags.map((tag) => tag.name),
            },
          },
          required: true,
        },
      ],
    });
    const targetChallengeCollection = challengeCollection(targetChallenges);

    const now = Date.now();
    const data = {
      challenges: targetChallengeCollection.map((challenge) => {
        if (
          challenge.userId !== authUser.id &&
          challenge.endAt.getTime() > now
        ) {
          return {
            ...challenge,
            answer: null,
          };
        } else {
          return challenge;
        }
      }),
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

export { indexChallengeSuggestion };

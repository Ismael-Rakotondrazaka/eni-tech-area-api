import { User, Challenge } from "../../models/index.js";
import { UnauthorizedError, NotFoundError } from "../../utils/errors/index.js";
import { createDataResponse } from "../../utils/responses/index.js";
import { challengeTagCollection } from "../../resources/index.js";

const indexChallengeTag = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    let { challengeId } = req.params;

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

    if (!/^\d+$/.test(challengeId)) throw new NotFoundError();

    challengeId = +challengeId;

    const targetChallenge = await Challenge.findByPk(challengeId);

    if (!targetChallenge) throw new NotFoundError();

    const targetChallengeTags = await targetChallenge.getTags({
      order: [["name", "ASC"]],
    });

    const targetTagsResource = challengeTagCollection(targetChallengeTags);

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

export { indexChallengeTag };

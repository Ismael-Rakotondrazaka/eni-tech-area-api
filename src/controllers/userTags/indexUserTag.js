import { User } from "../../models/index.js";
import { UnauthorizedError, NotFoundError } from "../../utils/errors/index.js";
import { createDataResponse } from "../../utils/responses/index.js";
import { userTagCollection } from "../../resources/index.js";
import { createBadge } from "../../utils/strings/createBadge.js";

const indexUserTag = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { userId: targetUserId } = req.params;

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

    const targetUser = await User.findByPk(targetUserId);

    if (!targetUser) throw new NotFoundError();

    const targetUserTags = await targetUser.getTags({
      order: [["name", "ASC"]],
    });

    const targetUserTagsCollection = userTagCollection(targetUserTags);

    const data = {
      tags: targetUserTagsCollection.map((userTag) => {
        const questionBadge = createBadge(userTag.questionScore);
        const challengeBadge = createBadge(userTag.challengeScore);
        return {
          ...userTag,
          questionBadge,
          challengeBadge,
        };
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

export { indexUserTag };

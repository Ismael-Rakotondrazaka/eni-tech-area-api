import { Challenge, User } from "../../models/index.js";
import { challengeResource } from "../../resources/index.js";
import {
  validateTitle,
  validateContent,
  UnauthorizedError,
  createDataResponse,
} from "../../utils/index.js";

const storeChallenge = async (req, res, next) => {
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

    let { title, content } = req.body;

    title = validateTitle(title);
    content = validateContent(content);

    const targetChallenge = await Challenge.create({
      userId: authUser.id,
      title,
      content,
    });

    await targetChallenge.reload();

    const targetChallengeResource = challengeResource(targetChallenge);

    const data = {
      challenge: targetChallengeResource,
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

export { storeChallenge };

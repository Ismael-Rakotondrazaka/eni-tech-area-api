import { User } from "../../models/index.js";
import { UnauthorizedError } from "../../utils/errors/index.js";
import { createDataResponse } from "../../utils/responses/index.js";
import { userResource } from "../../resources/index.js";

const whoami = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const authUser = await User.findByPk(authUserId, { include: "tags" });

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const authUserSource = userResource(authUser);

    const data = {
      user: authUserSource,
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

export { whoami };

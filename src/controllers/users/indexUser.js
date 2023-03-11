import { User } from "../../models/index.js";
import { UnauthorizedError } from "../../utils/errors/index.js";
import { createDataResponse } from "../../utils/responses/index.js";
import { userCollection } from "../../resources/index.js";

const indexUser = async (req, res, next) => {
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

    const targetUsers = await User.findAll({
      order: [
        ["firstName", "ASC"],
        ["lastName", "ASC"],
      ],
    });

    const targetUsersSource = userCollection(targetUsers);

    const data = {
      users: targetUsersSource,
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

export { indexUser };

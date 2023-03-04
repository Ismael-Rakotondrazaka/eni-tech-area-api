import { User } from "../../models/index.js";
import { ForbiddenError } from "../../utils/errors/index.js";
import { createDataResponse } from "../../utils/responses/index.js";
import { userResource } from "../../resources/index.js";

const updateUser = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { userId } = req.params;
    const { imageUrl } = req.body;

    if (!authUserId)
      throw new ForbiddenError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new ForbiddenError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (+userId !== authUserId) throw new ForbiddenError();

    await authUser.update({
      imageUrl: imageUrl || null,
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

export { updateUser };

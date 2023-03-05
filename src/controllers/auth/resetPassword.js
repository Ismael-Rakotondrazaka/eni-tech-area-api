import { User } from "../../models/index.js";
import { userResource } from "../../resources/index.js";
import {
  BadRequestError,
  createDataResponse,
  createAccessToken,
  hashPassword,
  validatePassword,
  validatePasswordValidation,
  UnauthorizedError,
} from "../../utils/index.js";

const resetPassword = async (req, res, next) => {
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

    const { password, passwordValidation } = req.body;

    const fieldsRequired = [
      {
        name: "password",
        code: "E2_",
      },
      {
        name: "passwordValidation",
        code: "E2_",
      },
    ];

    for (const field of fieldsRequired) {
      const data = req.body[field.name];
      if (!data)
        throw new BadRequestError({
          message: `Field '${field.name}' is missing.`,
          code: field.code,
        });
    }

    validatePassword(password);

    validatePasswordValidation(passwordValidation, password);

    const hashedPassword = hashPassword(password);

    await authUser.update({
      password: hashedPassword,
    });

    await authUser.reload();

    const targetUserResource = userResource(authUser);

    const accessTokenData = {
      user: {
        id: targetUserResource.id,
        name: targetUserResource.name,
        email: targetUserResource.email,
        role: targetUserResource.role,
      },
    };

    const accessToken = createAccessToken(accessTokenData);

    const data = {
      user: targetUserResource,
      tokens: {
        accessToken,
      },
    };

    const dataResponse = createDataResponse({
      data,
      request: req,
    });

    res.status(201);

    res.send(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { resetPassword };

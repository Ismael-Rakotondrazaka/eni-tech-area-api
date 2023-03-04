import { User } from "../../models/index.js";
import {
  createDataResponse,
  BadRequestError,
  UnauthorizedError,
  comparePassword,
  validateEmail,
  validatePassword,
  createAccessToken,
} from "../../utils/index.js";
import { userResource } from "../../resources/index.js";

const localLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    const fieldsRequired = [
      {
        name: "email",
        code: "E2_1",
      },
      {
        name: "password",
        code: "E2_2",
      },
    ];

    for (const field of fieldsRequired) {
      const data = req.body[field.name];
      if (!data)
        throw new BadRequestError({
          message: `Field '${field.name}' is required.`,
          code: field.code,
        });
    }

    email = validateEmail(email);
    validatePassword(password);

    const targetUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!targetUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const isPasswordMatch = comparePassword(password, targetUser.password);

    if (!isPasswordMatch)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetUserResource = userResource(targetUser);

    const accessTokenData = {
      user: {
        id: targetUserResource.id,
        name: targetUserResource.name,
        email: targetUserResource.email,
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

    return res.json(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { localLogin };

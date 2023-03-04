import { User } from "../../models/index.js";
import {
  decodeToken,
  UnauthorizedError,
  BadRequestError,
  createDataResponse,
  createAccessToken,
} from "../../utils/index.js";
import { userResource } from "../../resources/index.js";

const googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token)
      throw new BadRequestError({
        message: "token is missing",
        code: "E2_20",
      });

    const now = Date.now();

    const decoded = decodeToken(token);

    if (
      decoded == null ||
      typeof decoded !== "object" ||
      typeof decoded === "string"
    )
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const exp = decoded.exp;
    if (!exp || exp <= now)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const email = decoded.email;
    const providerId = decoded.sub;

    if (!email || !providerId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetUser = await User.findOne({
      where: {
        email,
        providerId,
      },
    });

    if (!targetUser)
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

export { googleLogin };

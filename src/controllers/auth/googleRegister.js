import { User } from "../../models/index.js";
import {
  decodeToken,
  UnauthorizedError,
  ConflictError,
  BadRequestError,
  createRandomString,
  createDataResponse,
  createAccessToken,
} from "../../utils/index.js";
import { userResource } from "../../resources/index.js";

const googleRegister = async (req, res, next) => {
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

    const imageUrl = decoded.picture || null;
    const email = decoded.email;
    const firstName = decoded.given_name;
    let lastName = decoded.family_name;
    const providerId = decoded.sub;

    if (!email || !firstName || !lastName || !providerId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    lastName = lastName.toUpperCase();

    const duplicate = await User.count({
      where: {
        email,
      },
    });

    if (duplicate !== 0)
      throw new ConflictError({
        message: "Email already used",
        code: "E4_1",
      });

    const defaultGoogleProviderName = "google";

    const targetUser = await User.create({
      firstName,
      lastName,
      email,
      imageUrl,
      //   gender: null,
      provider: defaultGoogleProviderName,
      providerId,
      channelId: createRandomString(),
    });

    await targetUser.reload();

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

    res.status(201);

    res.send(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { googleRegister };

import { User } from "../../models/index.js";
import { userResource } from "../../resources/index.js";
import {
  BadRequestError,
  ConflictError,
  createRandomString,
  createDataResponse,
  createAccessToken,
  hashPassword,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePasswordValidation,
  validateGender,
} from "../../utils/index.js";

const localRegister = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password, passwordValidation, gender } =
      req.body;

    const fieldsRequired = [
      {
        name: "firstName",
        code: "E2_1",
      },
      {
        name: "lastName",
        code: "E2_2",
      },
      {
        name: "email",
        code: "E2_3",
      },
      {
        name: "password",
        code: "E2_4",
      },
      {
        name: "passwordValidation",
        code: "E2_5",
      },
      {
        name: "gender",
        code: "E2_11",
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

    email = validateEmail(email);

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

    firstName = validateFirstName(firstName);
    lastName = validateLastName(lastName);
    gender = validateGender(gender);

    validatePassword(password);

    validatePasswordValidation(passwordValidation, password);

    const hashedPassword = hashPassword(password);

    const defaultLocalProviderName = "local";

    const targetUser = await User.create({
      firstName,
      lastName,
      email,
      gender,
      provider: defaultLocalProviderName,
      password: hashedPassword,
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

export { localRegister };

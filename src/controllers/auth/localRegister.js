import { User } from "../../models/index.js";
import { userResource, userTagCollection } from "../../resources/index.js";
import {
  BadRequestError,
  ConflictError,
  createRandomString,
  createDataResponse,
  createAccessToken,
  hashPassword,
  validateEmail,
  validateFirstname,
  validateLastname,
  validatePassword,
  validateRole,
} from "../../utils/index.js";

const localRegister = async (req, res, next) => {
  /**
   * We are gonna add the user information later.
   * But in the first registration, we only need
   * the user to provide his firstname, lastname, email, password and gender
   */
  try {
    let { firstname, lastname, email, password, gender, role } = req.body;

    const fieldsRequired = [
      {
        name: "firstname",
        code: "E2_1",
      },
      {
        name: "lastname",
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
        name: "role",
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

    email = validateEmail(email);

    const duplicateByEmail = await User.count({
      where: {
        email,
      },
    });

    if (duplicateByEmail !== 0)
      throw new ConflictError({
        message: "Email already used",
        code: "E4_1",
      });

    role = validateRole(role);

    firstname = validateFirstname(firstname);
    lastname = validateLastname(lastname);

    validatePassword(password);

    const hashedPassword = hashPassword(password);

    const defaultLocalProviderName = "local";

    const targetUser = await User.create({
      firstname,
      lastname,
      email,
      gender,
      role,
      provider: defaultLocalProviderName,
      password: hashedPassword,
      channelId: createRandomString(),
    });

    //  Get the user tags
    const userTags = await targetUser.getTags();

    await targetUser.reload();

    const targetUserResource = userResource(targetUser);

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
      user: {
        ...targetUserResource,
        tags: userTagCollection(userTags),
      },
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

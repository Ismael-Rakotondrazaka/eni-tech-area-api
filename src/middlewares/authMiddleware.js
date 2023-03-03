import { User } from "../models/index.js";
import { ForbiddenError } from "../utils/errors/index.js";

import { decodeAccessToken } from "../utils/index.js";

const authMiddleware = async (req, res, next) => {
  try {
    // authorization: "Bearer <token here>" expected
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) throw new ForbiddenError();

    const token = authHeader.split(" ")[1];

    if (!token) throw new ForbiddenError();

    const decoded = decodeAccessToken(token);

    if (
      decoded == null ||
      typeof decoded !== "object" ||
      typeof decoded === "string"
    )
      throw new ForbiddenError();

    const id = decoded?.user?.id;
    const email = decoded?.user?.email;

    if (!email || !id) throw new ForbiddenError();

    const targetUser = await User.findOne({
      where: {
        id,
        email,
      },
      attributes: ["id", "email"],
    });

    if (!targetUser) throw new ForbiddenError();

    /*
      we add the payload to the request object to mark as authenticated
    */
    req.payload = {
      user: {
        id: targetUser.id,
        email: targetUser.email,
      },
    };

    next();
  } catch (error) {
    // we mark the req.payload as null if auth failed
    req.payload = null;
    next(error);
  }
};

export { authMiddleware };

import { User } from "../models/index.js";
import { ForbiddenError } from "../utils/errors/index.js";

import { verifyAccessToken } from "../utils/index.js";

const authAdminMiddleware = async (req, res, next) => {
  try {
    // authorization: "Bearer <token here>" expected
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) throw new ForbiddenError();

    const token = authHeader.split(" ")[1];

    if (!token) throw new ForbiddenError();

    const decoded = verifyAccessToken(token);

    if (
      decoded == null ||
      typeof decoded !== "object" ||
      typeof decoded === "string"
    )
      throw new ForbiddenError();

    const id = decoded?.user?.id;
    const email = decoded?.user?.email;
    const role = decoded?.user?.role;

    if (!email || !id || !role) throw new ForbiddenError();

    const targetUser = await User.findOne({
      where: {
        id,
        email,
        role,
      },
      attributes: ["id", "email", "role"],
    });

    if (!targetUser) throw new ForbiddenError();
    if (targetUser.role !== "admin") throw new ForbiddenError();
    /*
      we add the payload to the request object to mark as authenticated
    */
    req.payload = {
      user: {
        id: targetUser.id,
        email: targetUser.email,
        role: targetUser.role,
      },
    };

    next();
  } catch (error) {
    // we mark the req.payload as null if auth failed
    req.payload = null;
    next(error);
  }
};

export { authAdminMiddleware };

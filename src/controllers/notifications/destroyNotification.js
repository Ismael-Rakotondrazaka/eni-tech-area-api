import { User, Notification } from "../../models/index.js";
import {
  UnauthorizedError,
  NotFoundError,
  createDataResponse,
} from "../../utils/index.js";

const destroyNotification = async (req, res, next) => {
  try {
    const authUserId = req.payload?.user?.id;
    const { notificationId } = req.params;

    if (!authUserId)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    if (!/^\d+$/.test(notificationId)) throw new NotFoundError();

    const authUser = await User.findByPk(authUserId);

    if (!authUser)
      throw new UnauthorizedError({
        message: "Credential doesn't match to our records.",
        code: "E5_1",
      });

    const targetNotification = await Notification.findOne({
      where: {
        id: notificationId,
        userId: authUser.id,
      },
    });

    if (!targetNotification) throw new NotFoundError();

    await targetNotification.destroy();

    const data = {
      status: "success",
    };

    const dataResponse = createDataResponse({
      data,
      request: req,
    });

    res.send(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { destroyNotification };

import { User } from "../../models/index.js";
import { notificationCollection } from "../../resources/index.js";
import { UnauthorizedError, createDataResponse } from "../../utils/index.js";

const indexNotification = async (req, res, next) => {
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

    const targetNotifications = await authUser.getNotifications();

    const targetNotificationsCollection =
      notificationCollection(targetNotifications);

    const data = {
      notifications: targetNotificationsCollection,
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

export { indexNotification };

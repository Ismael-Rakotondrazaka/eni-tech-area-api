import { Event, User } from "../../models/index.js";
import { eventResource } from "../../resources/eventResource.js";
import { notificationResource } from "../../resources/notificationResource.js";
import { socketIO } from "../../services/socketIO/index.js";
import {
  validateTitle,
  validateContent,
  UnauthorizedError,
  BadRequestError,
  createDataResponse,
  validateTag,
} from "../../utils/index.js";
import { validateEventIntervale } from "../../utils/strings/validateEventIntervale.js";

const storeEvent = async (req, res, next) => {
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

    let { title, content, startAt, endAt, image } = req.body;

    title = validateTitle(title);
    content = validateContent(content);
    const date = validateEventIntervale(startAt, endAt);
    console.log(date)
    startAt = date.startAt;
    endAt = date.endAt;


    const eventNotificationType = "event";

    const targetEvent = await Event.create({
      userId: authUser.id,
      title,
      content,
      startAt,
      endAt,
      image
    });

    await targetEvent.reload();

    const notificationContent = {
      type: eventNotificationType,
      eventId: targetEvent.id,
      content,
    };

    const notificationString = JSON.stringify(notificationContent);

    const userids = await User.findAll({ attributes: ["id", "channelId"] });

    const userIdChannelId = {};
    userids.forEach(user => {
      userIdChannelId[user.id] = user.channelId
    })

    const notification = await Notification.bulkCreate(
      userids.map((user) => ({
        userId: user.id,
        content: notificationString
      }))
    );

    notification.map((notif) => {
      const notifResource = notificationResource(notif);

      const data = {
        notification: notifResource,
      };

      socketIO.to(userIdChannelId[notifResource.userId]).emit("notifications:store", data);
    })


    const targetEventResource = eventResource(targetEvent);

    const data = {
      event: targetEventResource,
    };

    const dataResponse = createDataResponse({
      data,
      request: req,
    });

    res.status(201);

    return res.json(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { storeEvent };

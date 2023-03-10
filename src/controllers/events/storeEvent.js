import { Event, User } from "../../models/index.js";
import { eventResource } from "../../resources/eventResource.js";
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
    startAt= date.startAt;
    endAt= date.endAt;


  

    const targetEvent = await Event.create({
      userId: authUser.id,
      title,
      content,
      startAt,
      endAt,
      image
    });

    await targetEvent.reload();

    /*await QuestionTag.bulkCreate(
      tags.map((tag) => ({
        tagName: tag,
        questionId: targetQuestion.id,
      }))
    ); */
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

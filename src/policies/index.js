import { ServerError } from "../utils/errors/index.js";

import { answerPolicy } from "./answerPolicy.js";
import { commentPolicy } from "./commentPolicy.js";

const SOURCE_POLICY = {
  Answer: answerPolicy,
  Comment: commentPolicy,
};

const isAuthorizedTo = (
  subjects = {
    user: null,
    action: null,
    source: null,
    target: null,
    through: null,
  }
) => {
  const sourceHandler = SOURCE_POLICY[subjects.source];

  if (!sourceHandler)
    throw new ServerError({
      message: `'${subjects.source}' source policy not found.`,
      private: true,
      code: "E1_2",
    });

  const actionHandler = sourceHandler[subjects.action];

  if (!actionHandler)
    throw new ServerError({
      message: `'${subjects.action}' action policy not found.`,
      private: true,
      code: "E1_3",
    });

  return actionHandler(subjects);
};

export { isAuthorizedTo };

import { ForbiddenError } from "../utils/index.js";

const update = async (subjects) => {
  // user:User, target:Answer
  const { user, target } = subjects;

  // check if the user is the one who made the answer
  if (target.userId === user.id) {
    return true;
  }

  throw new ForbiddenError();
};

const answerPolicy = {
  update,
};

export { answerPolicy };

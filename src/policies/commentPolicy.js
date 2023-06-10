import { ForbiddenError } from "../utils/index.js";

const update = async (subjects) => {
  // user:User, target:Comment
  const { user, target } = subjects;

  // check if the user is the one who made the answer
  if (target.userId === user.id) {
    return true;
  }

  throw new ForbiddenError();
};

const destroy = async (subjects) => {
  // user:User, target:Comment
  const { user, target } = subjects;

  // check if the user is the one who made the comment
  if (target.userId === user.id) {
    return true;
  }

  throw new ForbiddenError();
};

const commentPolicy = {
  update,
  destroy,
};

export { commentPolicy };

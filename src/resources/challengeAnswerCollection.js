import { challengeAnswerResource } from "./challengeAnswerResource.js";

const challengeAnswerCollection = (collection) => {
  return collection.map((resource) => challengeAnswerResource(resource));
};

export { challengeAnswerCollection };

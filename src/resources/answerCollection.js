import { answerResource } from "./answerResource.js";

const answerCollection = (collection) => {
  return collection.map((resource) => answerResource(resource));
};

export { answerCollection };

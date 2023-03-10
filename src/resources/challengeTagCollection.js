import { challengeTagResource } from "./challengeTagResource.js";

const challengeTagCollection = (collection) => {
  return collection.map((resource) => challengeTagResource(resource));
};

export { challengeTagCollection };

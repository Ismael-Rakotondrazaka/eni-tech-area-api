import { challengeResource } from "./challengeResource.js";

const challengeCollection = (collection) => {
  return collection.map((resource) => challengeResource(resource));
};

export { challengeCollection };

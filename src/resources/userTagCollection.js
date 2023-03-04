import { userTagResource } from "./userTagResource.js";

const userTagCollection = (collection) => {
  return collection.map((resource) => userTagResource(resource));
};

export { userTagCollection };

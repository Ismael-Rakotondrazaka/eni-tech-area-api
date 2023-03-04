import { commentResource } from "./commentResource.js";

const commentCollection = (collection) => {
  return collection.map((resource) => commentResource(resource));
};

export { commentCollection };

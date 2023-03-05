import { userResource } from "./userResource.js";

const userCollection = (collection) => {
  return collection.map((resource) => userResource(resource));
};

export { userCollection };

import { eventResource } from "./eventResource.js";

const eventCollection = (collection) => {
  return collection.map((resource) => eventResource(resource));
};

export { eventCollection };

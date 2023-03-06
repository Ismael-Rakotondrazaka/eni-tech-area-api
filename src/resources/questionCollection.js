import { questionResource } from "./questionResource.js";

const questionCollection = (collection) => {
  return collection.map((resource) => questionResource(resource));
};

export { questionCollection };

import { questionTagResource } from "./questionTagResource.js";

const questionTagCollection = (collection) => {
  return collection.map((resource) => questionTagResource(resource));
};

export { questionTagCollection };

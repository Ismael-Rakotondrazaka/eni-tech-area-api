import { tagResource } from "./tagResource.js";

export const tagCollection = (collection) => {
  return collection.map((resource) => tagResource(resource));
};

import { voteResource } from "./voteResource.js";

const voteCollection = (collection) => {
  return collection.map((resource) => voteResource(resource));
};

export { voteCollection };

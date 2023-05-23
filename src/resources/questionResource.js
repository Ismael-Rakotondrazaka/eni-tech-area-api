import { answerCollection } from "./answerCollection.js";
import { tagCollection } from "./tagCollection.js";
import { userResource } from "./userResource.js";

const questionResource = (resource) => {
  return {
    id: resource.id,
    title: resource.title,
    content: resource.content,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
    user: userResource(resource.user),
    tags: tagCollection(resource.tags),
    answers: answerCollection(resource.answers),
  };
};

export { questionResource };

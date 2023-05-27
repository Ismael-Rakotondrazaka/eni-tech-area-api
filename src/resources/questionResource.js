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
    ...(resource.user && {
      user: userResource(resource.user),
    }),
    ...(resource.tags && {
      tags: tagCollection(resource.tags),
    }),
    ...(resource.answers && {
      answers: answerCollection(resource.answers),
    }),
  };
};

export { questionResource };

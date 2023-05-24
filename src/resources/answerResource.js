import { commentCollection } from "./commentCollection.js";
import { userResource } from "./userResource.js";
import { voteCollection } from "./voteCollection.js";

const answerResource = (resource) => {
  return {
    id: resource.id,
    questionId: resource.questionId,
    content: resource.content,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
    ...(resource.user && {
      user: userResource(resource.user),
    }),
    ...(resource.comments && {
      comments: commentCollection(resource.comments),
    }),
    ...(resource.votes && { votes: voteCollection(resource.votes) }),
  };
};

export { answerResource };

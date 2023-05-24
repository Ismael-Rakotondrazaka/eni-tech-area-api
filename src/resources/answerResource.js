import { commentCollection } from "./commentCollection.js";
import { voteCollection } from "./voteCollection.js";

const answerResource = (resource) => {
  return {
    id: resource.id,
    userId: resource.userId,
    questionId: resource.questionId,
    content: resource.content,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
    ...(resource.comments && {
      comments: commentCollection(resource.comments),
    }),
    ...(resource.votes && { votes: voteCollection(resource.votes) }),
  };
};

export { answerResource };

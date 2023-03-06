const challengeAnswerResource = (resource) => {
  return {
    id: resource.id,
    userId: resource.userId,
    challengeId: resource.challengeId,
    content: resource.content,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { challengeAnswerResource };

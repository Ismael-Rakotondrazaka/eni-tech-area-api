const voteResource = (resource) => {
  return {
    id: resource.id,
    answerId: resource.answerId,
    userId: resource.userId,
    type: resource.type,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { voteResource };

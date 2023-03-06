const userTagResource = (resource) => {
  return {
    id: resource.id,
    userId: resource.userId,
    tagName: resource.tagName,
    score: resource.score,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { userTagResource };

const commentResource = (resource) => {
  return {
    id: resource.id,
    userId: resource.userId,
    answerId: resource.answerId,
    content: resource.content,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { commentResource };

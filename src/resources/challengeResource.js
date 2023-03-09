const challengeResource = (resource) => {
  return {
    id: resource.id,
    title: resource.title,
    content: resource.content,
    userId: resource.userId,
    endAt: resource.endAt,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { challengeResource };

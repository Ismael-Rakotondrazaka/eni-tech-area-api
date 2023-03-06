const questionResource = (resource) => {
  return {
    id: resource.id,
    title: resource.title,
    content: resource.content,
    userId: resource.userId,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { questionResource };

const eventResource = (resource) => {
  return {
    id: resource.id,
    title: resource.title,
    content: resource.content,
    userId: resource.userId,
    startAt: resource.startAt,
    endAt: resource.endAt,
    images: resource.images,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { eventResource };

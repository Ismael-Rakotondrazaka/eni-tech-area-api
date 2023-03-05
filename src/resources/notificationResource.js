const notificationResource = (resource) => {
  return {
    id: resource.id,
    userId: resource.userId,
    content: resource.content,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { notificationResource };

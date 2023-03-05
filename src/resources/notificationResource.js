const notificationResource = (resource) => {
  return {
    id: resource.id,
    type: resource.type,
    userId: resource.userId,
    content: resource.content,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { notificationResource };

const questionResource = (resource) => {
  return {
    id: resource.id,
    title: resource.title,
    content: resource.content,
    userId: resource.userId,
  };
};

export { questionResource };

const questionTagResource = (resource) => {
  return {
    id: resource.id,
    questionId: resource.questionId,
    tagName: resource.tagName,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { questionTagResource };

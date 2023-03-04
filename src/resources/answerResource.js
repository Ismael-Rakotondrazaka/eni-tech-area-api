const answerResource = (resource) => {
  return {
    id: resource.id,
    userId: resource.userId,
    questionId: resource.questionId,
    content: resource.content,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { answerResource };

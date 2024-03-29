const challengeResource = (resource) => {
  return {
    id: resource.id,
    title: resource.title,
    question: resource.question,
    answer: resource.answer,
    difficulty: resource.difficulty,
    userId: resource.userId,
    endAt: resource.endAt,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { challengeResource };

const userTagResource = (resource) => {
  return {
    userId: resource.userId,
    name: resource.name,
    bgColor: resource.bgColor,
    textColor: resource.textColor,
    questionScore: resource.UserTag.questionScore,
    challengeScore: resource.UserTag.challengeScore,
    createdAt: resource.UserTag.createdAt,
    updatedAt: resource.UserTag.updatedAt,
  };
};

export { userTagResource };

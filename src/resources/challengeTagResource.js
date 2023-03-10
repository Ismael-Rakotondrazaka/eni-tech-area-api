const challengeTagResource = (resource) => {
  return {
    userId: resource.userId,
    name: resource.name,
    bgColor: resource.bgColor,
    textColor: resource.textColor,
    createdAt: resource.ChallengeTag.createdAt,
    updatedAt: resource.ChallengeTag.updatedAt,
  };
};

export { challengeTagResource };

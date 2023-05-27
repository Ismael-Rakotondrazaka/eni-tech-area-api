export const tagResource = (resource) => {
  return {
    id: resource.id,
    name: resource.name,
    bgColor: resource.bgColor,
    textColor: resource.textColor,
    ...(resource.UserTag && {
      questionScore: resource.UserTag.questionScore,
      challengeScore: resource.UserTag.challengeScore,
    }),
  };
};

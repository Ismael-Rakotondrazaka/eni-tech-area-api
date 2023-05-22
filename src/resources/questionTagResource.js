const questionTagResource = (resource) => {
  return {
    userId: resource.userId,
    name: resource.name,
    bgColor: resource.bgColor,
    textColor: resource.textColor,
    createdAt: resource.QuestionTag.createdAt,
    updatedAt: resource.QuestionTag.updatedAt,
  };
};

export { questionTagResource };

export const tagResource = (resource) => {
  return {
    id: resource.id,
    name: resource.name,
    bgcolor: resource.bgColor,
    textColor: resource.textColor,
  };
};

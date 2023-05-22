export const tagResource = (resource) => {
  return {
    id: resource._id,
    name: resource.name,
    bgcolor: resource.bgColor,
    textColor: resource.textColor,
  };
};

import { userResource } from "./userResource.js";

const commentResource = (resource) => {
  return {
    id: resource.id,
    content: resource.content,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
    user: userResource(resource.user),
  };
};

export { commentResource };

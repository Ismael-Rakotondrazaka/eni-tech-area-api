import { notificationResource } from "./notificationResource.js";
const notificationCollection = (collection) => {
  return collection.map((resource) => notificationResource(resource));
};

export { notificationCollection };

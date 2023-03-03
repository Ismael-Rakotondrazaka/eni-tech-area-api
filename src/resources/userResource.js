const userResource = (resource) => {
  return {
    id: resource.id,
    name: {
      first: resource.firstName,
      last: resource.lastName,
      full: resource.fullName,
    },
    email: resource.email,
    gender: resource.gender,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  };
};

export { userResource };

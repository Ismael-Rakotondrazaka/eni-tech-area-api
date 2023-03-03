const createDataResponse = ({ data, request }) => {
  return {
    data,
    path: request.url,
    method: request.method,
    userAgent: request.headers["user-agent"],
  };
};

export { createDataResponse };

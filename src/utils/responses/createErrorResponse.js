const createErrorResponse = ({ error, request }) => {
  return {
    error: {
      message: error.getMessage(),
      statusCode: error.getStatusCode(),
      statusText: error.getStatusText(),
      code: error.getCode(),
      dateTime: error.getDateTime(),
    },
    path: request.url,
    method: request.method,
    userAgent: request.headers["user-agent"],
  };
};

export { createErrorResponse };

export const errors = {
  UNAUTHORIZED_FOR_ACTION: {
    message: 'User not authorized to perform this action',
    httpCode: 403,
  },
  NOT_FOUND: {
    message: 'Not found',
    httpCode: 404,
  },
  MISSING_AUTH_TOKEN: {
    message: 'Authentication token missing',
    httpCode: 401,
  },
  WRONG_AUTH_TOKEN: {
    message: 'Wrong authentication token',
    httpCode: 401,
  },
  RESOURCE_NOT_FOUND: {
    message: 'Resource not found',
    httpCode: 409,
  },
  EMPTY_DATA: {
    message: 'Data sent is empty',
    httpCode: 400,
  },
  MISSING_ID: {
    message: 'Missing id in query param',
    httpCpde: 400,
  },
};

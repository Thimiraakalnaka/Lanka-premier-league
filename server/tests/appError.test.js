const createError = require('../utils/appError');

describe('createError', () => {
  it('should create an instance of Error with status code and message', () => {
    const statusCode = 404;
    const message = 'Not Found';
    const error = new createError(message, statusCode);
    
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
    expect(error.status).toBe('fail');
  });

  it('should default status to "error" for non-4xx status codes', () => {
    const statusCode = 500;
    const message = 'Internal Server Error';
    const error = new createError(message, statusCode);
    
    expect(error.status).toBe('error');
  });
});

// src/middleware/error.js
const { ValidationError, AuthenticationError, ForbiddenError, NotFoundError } = require('../utils/errors');
const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  // Default to 500 if status code is not set
  const statusCode = err.statusCode || 500;
  const response = {
    error: err.name || 'InternalServerError',
    message: err.message || 'Internal Server Error',
    statusCode
  };

  // Add validation errors if they exist
  if (err.errors) {
    response.errors = err.errors;
  }

  // Log the error
  if (statusCode >= 500) {
    logger.error('Server Error:', {
      error: err,
      stack: err.stack,
      request: {
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        query: req.query,
        body: req.body,
        user: req.user
      }
    });
  } else {
    logger.warn('Client Error:', {
      error: response,
      request: {
        method: req.method,
        url: req.originalUrl,
        user: req.user?.id
      }
    });
  }

  // Send the error response
  res.status(statusCode).json(response);
};

// Error handler for async/await
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  errorHandler,
  asyncHandler,
  ValidationError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError
};
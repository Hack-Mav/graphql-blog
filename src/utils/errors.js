// src/utils/errors.js
class ValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
    this.statusCode = 400;
  }

  toJSON() {
    return {
      error: this.name,
      message: this.message,
      errors: this.errors,
      statusCode: this.statusCode
    };
  }
}

class AuthenticationError extends Error {
  constructor(message = 'Authentication required') {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(resource) {
    super(`${resource || 'Resource'} not found`);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  ValidationError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError
};
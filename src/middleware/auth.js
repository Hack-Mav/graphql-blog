const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('../utils/logger');

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      // No token, proceed as unauthenticated
      req.user = null;
      return next();
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, config.JWT_SECRET);
      
      // Add user to request object
      req.user = {
        id: decoded.userId,
        role: decoded.role,
        email: decoded.email
      };
      
      next();
    } catch (error) {
      logger.error('Token verification failed:', error.message);
      // Don't throw error here, just set user to null
      req.user = null;
      next();
    }
  } catch (error) {
    logger.error('Authentication error:', error);
    next(error);
  }
};

/**
 * Protect routes - require authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
const protectedRoute = (req, res, next) => {
  if (!req.user) {
    throw new AuthenticationError('Authentication required');
  }
  next();
};

/**
 * Restrict route to specific roles
 * @param {...string} roles - Allowed roles
 * @returns {Function} Middleware function
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AuthenticationError('Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('You do not have permission to perform this action');
    }

    next();
  };
};

/**
 * GraphQL authentication middleware
 * @param {Object} context - GraphQL context
 * @param {Array} roles - Required roles
 * @returns {Object} User object
 */
const gqlAuth = (context, roles = []) => {
  const { req } = context;
  
  if (!req.user) {
    throw new AuthenticationError('Authentication required');
  }

  if (roles.length && !roles.includes(req.user.role)) {
    throw new ForbiddenError('Insufficient permissions');
  }

  return req.user;
};

module.exports = {
  authenticate,
  protectedRoute,
  restrictTo,
  gqlAuth
};

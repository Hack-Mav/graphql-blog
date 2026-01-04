// src/utils/graphql.js
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

/**
 * Get authenticated user from context
 * @param {Object} context - GraphQL context
 * @param {Array} [roles=[]] - Required roles
 * @returns {Object} Authenticated user
 */
const getAuthUser = (context, roles = []) => {
  if (!context.user) {
    throw new AuthenticationError('Authentication required');
  }

  if (roles.length > 0 && !roles.includes(context.user.role)) {
    throw new ForbiddenError('Insufficient permissions');
  }

  return context.user;
};

module.exports = {
  getAuthUser,
};
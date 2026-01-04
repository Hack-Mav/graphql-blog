// src/loaders/apollo.js
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const { gqlAuth } = require('../middleware/auth');
const { ForbiddenError } = require('apollo-server-express');

const createApolloServer = async (app) => {
  const { typeDefs, resolvers } = require('../modules');
  
  // Create schema with middleware
  const schema = applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
    })
  );

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      // Add user to context if authenticated
      const context = { req, res };
      
      // Apply GraphQL authentication
      try {
        // This will throw an error if authentication fails
        const user = gqlAuth({ req }, []); // Empty array means no specific role required
        return { ...context, user };
      } catch (error) {
        // If it's an authentication error, we'll let the resolver handle it
        if (error.message === 'Authentication required') {
          return context;
        }
        throw error;
      }
    },
    formatError: (error) => {
      // Don't expose internal errors to the client
      if (error.message.startsWith('Database Error')) {
        return new Error('Internal server error');
      }
      
      // Log the error
      console.error(error);
      
      // Return the original error
      return error;
    },
    introspection: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production',
  });

  await server.start();
  server.applyMiddleware({ 
    app,
    cors: false, // We handle CORS in the Express middleware
  });

  return server;
};

module.exports = createApolloServer;
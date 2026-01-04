const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { json } = require('body-parser');
const config = require('./config/config');
const logger = require('./utils/logger');
const { connect: connectToDatabase } = require('./config/database');

// Import your GraphQL schema and resolvers
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    logger.info('✅ Connected to MongoDB');

    // Initialize Express app
    const app = express();
    const httpServer = http.createServer(app);

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      formatError: (error) => {
        logger.error('GraphQL Error:', error);
        return {
          message: error.message,
          locations: error.locations,
          path: error.path,
        };
      },
    });

    // Start the server
    await server.start();
    logger.info('✅ Apollo Server started');

    // Apply middleware
    app.use(
      '/graphql',
      cors(),
      json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          return { token: req.headers.authorization };
        },
      })
    );

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'ok' });
    });

    // Start the HTTP server
    await new Promise((resolve) => httpServer.listen({ port: config.PORT }, resolve));
    logger.info(`🚀 Server ready at http://localhost:${config.PORT}/graphql`);

  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
startServer();
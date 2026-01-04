const express = require('express');
const http = require('http');
const loaders = require('./loaders');
const config = require('./config');
const logger = require('./utils/logger');

const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  try {
    // Initialize loaders (database, express, apollo, etc.)
    const { apolloServer } = await loaders(app);
    
    // Start the server
    await new Promise((resolve) => {
      httpServer.listen({ port: config.PORT }, resolve);
    });

    logger.info(`🚀 Server ready at http://localhost:${config.PORT}${apolloServer.graphqlPath}`);
    
    return { app, server: httpServer, apolloServer };
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  // Close server & exit process
  process.exit(1);
});

// Handle SIGTERM (for Docker)
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully');
  process.exit(0);
});

// Start the server
if (require.main === module) {
  startServer();
}

module.exports = { startServer };

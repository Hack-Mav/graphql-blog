require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { constraintDirective, constraintDirectiveTypeDefs } = require('graphql-constraint-directive');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { json } = require('body-parser');
const { applyMiddleware } = require('graphql-middleware');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const path = require('path');

// Config and Utils
const config = require('./config/config');
const logger = require('./utils/logger');
const { connect: connectToDatabase } = require('./config/database');

// Security Middleware
const { authMiddleware } = require('./middleware/auth');

// Load all GraphQL type definitions and resolvers
const loadedTypes = loadFilesSync(path.join(__dirname, 'modules/**/schema/*.graphql'));
const loadedResolvers = loadFilesSync(path.join(__dirname, 'modules/**/resolvers/*.js'));

// Merge types with constraint directive type definitions
const typeDefs = mergeTypeDefs([...loadedTypes, constraintDirectiveTypeDefs]);
const resolvers = mergeResolvers(loadedResolvers);

// Create schema with constraint directive
let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  inheritResolversFromInterfaces: true
});

// Apply constraint directive to the schema
schema = constraintDirective()(schema);

// Apply other middleware
const schemaWithMiddleware = applyMiddleware(schema);

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
      schema: schemaWithMiddleware,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      formatError: (error) => {
        logger.error('GraphQL Error:', error);
        return {
          message: error.message,
          locations: error.locations,
          path: error.path,
          extensions: error.extensions,
        };
      },
      introspection: process.env.NODE_ENV !== 'production',
    });

    // Start the server
    await server.start();
    logger.info('✅ Apollo Server started');

    // Apply middleware
    app.use(
      '/graphql',
      cors({
        origin: config.CORS_ORIGIN || '*',
        credentials: true,
      }),
      json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          // Add user to context if authenticated
          const token = req.headers.authorization || '';
          const user = await authMiddleware(token);
          return { user };
        },
      })
    );

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
      });
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
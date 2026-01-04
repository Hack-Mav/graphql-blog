const createExpressApp = require('./express');
const createApolloServer = require('./apollo');
const connectDatabase = require('../config/database');
const { connectRedis } = require('../config/redis');
const logger = require('../utils/logger');

const loaders = async (app) => {
  try {
    // Initialize database connections
    await connectDatabase();
    await connectRedis();
    
    // Create Express app
    const expressApp = createExpressApp();
    
    // Create Apollo Server and apply middleware
    const apolloServer = await createApolloServer(expressApp);
    
    // Mount Express app to main app
    app.use(expressApp);
    
    logger.info('Loaders initialized');
    
    return {
      expressApp,
      apolloServer,
    };
  } catch (error) {
    logger.error('Failed to initialize loaders:', error);
    process.exit(1);
  }
};

module.exports = loaders;

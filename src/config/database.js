const mongoose = require('mongoose');
const config = require('./config');
const logger = require('../utils/logger');

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// Print mongoose logs in development env
if (config.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to MongoDB
 * @returns {Promise<mongoose.Connection>} Mongoose connection instance
 */
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('✅ Connected to MongoDB');
  } catch (error) {
    logger.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB
 * @returns {Promise<void>}
 */
const disconnect = async () => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected');
  } catch (error) {
    logger.error(`Error disconnecting from MongoDB: ${error.message}`);
    throw error;
  }
};

/**
 * Clear the database, mainly used for testing
 * @returns {Promise<void>}
 */
const clearDatabase = async () => {
  if (process.env.NODE_ENV === 'test') {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
};

module.exports = {
  connect,
  disconnect,
  clearDatabase,
  connection: mongoose.connection,
};

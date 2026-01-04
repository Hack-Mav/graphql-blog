const { createClient } = require('redis');
const config = require('./config');
const logger = require('../utils/logger');

class RedisClient {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  /**
   * Initialize Redis connection
   * @returns {Promise<RedisClient>}
   */
  async connect() {
    try {
      this.client = createClient({
        url: config.REDIS_URL,
        socket: {
          reconnectStrategy: (retries) => {
            if (retries > 5) {
              logger.error('Max reconnection attempts reached. Could not connect to Redis.');
              return new Error('Max reconnection attempts reached');
            }
            // Reconnect after 1 second
            return 1000;
          },
        },
      });

      this.client.on('error', (err) => {
        logger.error(`Redis error: ${err}`);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        logger.info('Redis connected');
        this.isConnected = true;
      });

      this.client.on('reconnecting', () => {
        logger.info('Redis reconnecting...');
        this.isConnected = false;
      });

      this.client.on('end', () => {
        logger.warn('Redis connection closed');
        this.isConnected = false;
      });

      await this.client.connect();
      return this;
    } catch (error) {
      logger.error(`Failed to connect to Redis: ${error.message}`);
      throw error;
    }
  }

  /**
   * Close Redis connection
   * @returns {Promise<void>}
   */
  async disconnect() {
    if (this.client) {
      try {
        await this.client.quit();
        this.isConnected = false;
        logger.info('Redis connection closed');
      } catch (error) {
        logger.error(`Error closing Redis connection: ${error.message}`);
        throw error;
      }
    }
  }

  /**
   * Get value by key
   * @param {string} key
   * @returns {Promise<string|null>}
   */
  async get(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.get(key);
    } catch (error) {
      logger.error(`Redis get error: ${error.message}`);
      return null;
    }
  }

  /**
   * Set key-value pair with optional expiration
   * @param {string} key
   * @param {string} value
   * @param {number} [expireInSeconds]
   * @returns {Promise<boolean>}
   */
  async set(key, value, expireInSeconds) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      
      if (expireInSeconds) {
        await this.client.set(key, value, {
          EX: expireInSeconds,
        });
      } else {
        await this.client.set(key, value);
      }
      
      return true;
    } catch (error) {
      logger.error(`Redis set error: ${error.message}`);
      return false;
    }
  }

  /**
   * Delete a key
   * @param {string} key
   * @returns {Promise<boolean>}
   */
  async del(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      const result = await this.client.del(key);
      return result > 0;
    } catch (error) {
      logger.error(`Redis delete error: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if a key exists
   * @param {string} key
   * @returns {Promise<boolean>}
   */
  async exists(key) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`Redis exists error: ${error.message}`);
      return false;
    }
  }

  /**
   * Set expiration for a key
   * @param {string} key
   * @param {number} seconds
   * @returns {Promise<boolean>}
   */
  async expire(key, seconds) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      return await this.client.expire(key, seconds);
    } catch (error) {
      logger.error(`Redis expire error: ${error.message}`);
      return false;
    }
  }
}

// Create a singleton instance
const redisClient = new RedisClient();

// Handle process termination
process.on('SIGINT', async () => {
  await redisClient.disconnect();
  process.exit(0);
});

module.exports = redisClient;

const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const config = {
  // Server configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  
  // MongoDB configuration
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/blogdb',
  MONGO_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  },
  
  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // Security
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100, // Limit each IP to 100 requests per windowMs
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  
  // Redis (for caching and rate limiting)
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

// Validate required configurations
const requiredConfigs = ['MONGO_URI', 'JWT_SECRET'];
const missingConfigs = requiredConfigs.filter(key => !process.env[key]);

if (missingConfigs.length > 0 && process.env.NODE_ENV === 'production') {
  throw new Error(`Missing required environment variables: ${missingConfigs.join(', ')}`);
}

module.exports = config;

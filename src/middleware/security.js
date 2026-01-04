const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const config = require('../config/config');
const logger = require('../utils/logger');
const redisClient = require('../config/redis');

// Rate limiting configuration
const rateLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      status: 'error',
      message: 'Too many requests, please try again later.',
    });
  },
  // Use Redis for distributed rate limiting in production
  store: process.env.NODE_ENV === 'production' ? new RateLimitRedisStore({
    client: redisClient,
    expiry: config.RATE_LIMIT_WINDOW_MS / 1000, // Convert to seconds
  }) : undefined,
});

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = config.CORS_ORIGIN.split(',').map(o => o.trim());
    
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 600, // seconds
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Security headers middleware
const securityHeaders = [
  // Helmet provides security headers
  helmet(),
  
  // Prevent clickjacking
  helmet.frameguard({ action: 'deny' }),
  
  // Enable CORS
  cors(corsOptions),
  
  // Rate limiting
  rateLimiter,
  
  // Prevent MIME type sniffing
  (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  },
  
  // Add security headers
  (req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  },
];

// Input validation middleware
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({
      status: 'error',
      errors: errors.array(),
    });
  };
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl, ip, headers } = req;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const userAgent = headers['user-agent'] || '';
    
    logger.info(
      `${method} ${originalUrl} ${statusCode} - ${duration}ms - ${ip} - ${userAgent}`
    );
    
    // Log request body for debugging (be cautious with sensitive data)
    if (process.env.NODE_ENV === 'development' && Object.keys(req.body).length > 0) {
      logger.debug('Request body:', JSON.stringify(req.body, null, 2));
    }
  });
  
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;
  
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  logger.error(err.stack);
  
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(stack && { stack }), // Only include stack in development
  });
};

// Not found handler
const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not Found',
  });
};

module.exports = {
  securityHeaders,
  validate,
  requestLogger,
  errorHandler,
  notFoundHandler,
  rateLimiter,
  cors: cors(corsOptions),
};

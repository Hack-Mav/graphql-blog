const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');

const { NODE_ENV } = require('../config');
const { errorHandler } = require('../middleware/error');
const { authenticate } = require('../middleware/auth');

const createExpressApp = () => {
  const app = express();

  // Trust proxy in production
  if (NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  // Middleware
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  
  // CORS configuration
  const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));

  // Logging
  if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Apply authentication middleware for all routes
  app.use(authenticate);

  // Protected API routes (example)
  // app.use('/api', protectedRoute, require('../api'));

  // Admin routes (example)
  // app.use('/admin', restrictTo('admin'), require('../admin'));

  // Error handling middleware
  app.use(errorHandler);

  return app;
};

module.exports = createExpressApp;

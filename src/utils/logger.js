const winston = require('winston');
const config = require('../config/config');

const { combine, timestamp, printf, colorize, align } = winston.format;

// Define log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  const logMessage = `${timestamp} [${level}]: ${stack || message}`;
  return logMessage;
});

// Create logger instance
const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: combine(
    colorize({ all: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    align(),
    logFormat
  ),
  transports: [
    // Write all logs with level `error` and below to `error.log`
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs with level `info` and below to `combined.log`
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: combine(
      colorize({ all: true }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      align(),
      logFormat
    ),
  }));
}

// Create a stream object with a 'write' function that will be used by morgan
logger.stream = {
  write: function (message) {
    // Use the 'info' log level so the output will be picked up by both transports
    logger.info(message.trim());
  },
};

module.exports = logger;

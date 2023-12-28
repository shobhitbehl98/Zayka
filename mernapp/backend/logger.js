const winston = require('winston');

// Configure Winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    // Add additional transports if needed, e.g., file transport
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
});

module.exports = logger;

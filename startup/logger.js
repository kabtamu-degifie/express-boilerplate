const winston = require("winston");
require("express-async-errors");
require("dotenv").config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize()
  ),

  transports: [
    new winston.transports.File({
      filename: "./logs/info.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./logs/info.log",
      level: "info",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "./logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "./logs/exceptions.log" }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true,
      rejectionHandlers: true,
    })
  );
}

module.exports = logger;

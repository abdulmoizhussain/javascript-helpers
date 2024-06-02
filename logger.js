// sources:
// https://stackoverflow.com/a/24942977/8075004
// https://stackoverflow.com/a/60866937/8075004
// https://stackoverflow.com/a/56894389/8075004
// https://github.com/winstonjs/winston-daily-rotate-file?tab=readme-ov-file#usage
// https://snyk.io/advisor/npm-package/winston/functions/winston.format.printf

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { default: safeStringify } = require('fast-safe-stringify');
const pyformat = require("pyformat");

const stringifyArgs = (args) => args.map(x => safeStringify(x));

const createFormat = (loggerLabel = "worker") => winston.format.combine(
  winston.format.label({ label: loggerLabel }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  // winston.format.prettyPrint(),
  // winston.format.align(),
  winston.format.printf(({ message, timestamp, label, level, ...meta }) => {
    const args = meta[Symbol.for("splat")];

    let msg;
    if (typeof (message) === "string") {
      msg = args ? pyformat(message, stringifyArgs(args)) : message;
    }
    else {
      msg = safeStringify(message);
    }

    return `${timestamp} ${label} [${level}]: ${msg}`;
  })
);

const logger = winston.createLogger({
  level: 'info',
  // format: winston.format.json(),
  format: createFormat("worker"),
  datePattern: "YYYY-MM-DD",
  // defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new DailyRotateFile({
      filename: './logs/%DATE%.log', // Filename pattern including %DATE% placeholder
      datePattern: 'YYYY-MM-DD', // Date format to replace %DATE%
      // zippedArchive: true,
      // maxSize: '20m',
      // maxFiles: '14d'
    }),
  ],
});

// If we're not in production then log to the `console` with the format:
// if (process.env.NODE_ENV !== 'production') {
// if (config.logging.consoleAppender.enabled) {
logger.add(new winston.transports.Console({ format: createFormat("worker") }));
// }

module.exports = {
  simpleLogger: logger
};
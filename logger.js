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

const createFormat = (loggerLabel = "worker", colorize = false) => {
  const formats = [];

  if (colorize) formats.push(winston.format.colorize()); // does not work if we push it at the end after printf.

  formats.push(winston.format.label({ label: loggerLabel }));
  formats.push(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }));
  // formats.push(winston.format.prettyPrint());
  // formats.push(winston.format.align());
  formats.push(winston.format.printf(({ message, timestamp, label, level, ...meta }) => {
    const args = meta[Symbol.for("splat")];

    let msg;
    if (typeof (message) === "string") {
      msg = args ? pyformat(message, stringifyArgs(args)) : message;
    }
    else {
      msg = safeStringify(message);
    }

    return `${timestamp} ${label} [${level}]: ${msg}`;
  }));

  return winston.format.combine(...formats);
};

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
logger.add(new winston.transports.Console({ format: createFormat("worker", true) }));
// }

module.exports = {
  simpleLogger: logger
};

/*
// usage

const { simpleLogger: logger } = require("./logger");
logger.info("simple log.");
logger.info("formattable log. 1st: {}, 2nd: {}, 3rd: {}", "arg1", 100, { someProp: "itsvalue" });
logger.info("formattable log. 1st: {}, 2nd: {}, 3rd: {}", "arg1", -1, false);
*/

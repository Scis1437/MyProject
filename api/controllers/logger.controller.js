const { json } = require("body-parser");
const { transports, format, createLogger } = require("winston");

const teacherLog = createLogger({
  transports: [
    new transports.File({
      filename: "teacher_log",
      level: "info",
      json: false,
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS",
          getTime: () => new Date(),
        }),
        format.json()
      ),
    }),
    new transports.File({
      filename: "teacher_log_error",
      level: "error",

      json: false,
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS",
          getTime: () => new Date(),
        }),
        format.json()
      ),
    }),
  ],
});

module.exports = { teacherLog };

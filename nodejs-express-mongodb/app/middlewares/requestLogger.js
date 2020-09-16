const fs = require('fs');
const chalk = require('chalk');

const getActualRequestDurationInMilliseconds = start => {
  const NS_PER_SEC = 1e9; // convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const demoLogger = (req, res, next) => {
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  let logToFile = `[${formatted_date}] ${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;
  let log = `[${chalk.blue(formatted_date)}] ${method}:${url} ${status} ${chalk.red(durationInMilliseconds.toLocaleString() + "ms")}`;
  console.log(log);

  fs.appendFile("logs/request_logs.txt", logToFile + "\n", err => {
    if (err) {
      console.log(err);
    }
  });

  next();
};

module.exports = demoLogger;
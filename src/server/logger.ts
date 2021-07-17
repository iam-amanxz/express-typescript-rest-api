import { createLogger, format, transports } from 'winston';

import serverConfig from '../config/server.config';

const { combine, timestamp, colorize, printf } = format;

const logFormat = printf(
  /* eslint no-shadow: 0 */
  ({ timestamp, message, level }) => `[${level}] ${timestamp} : ${message}`,
);

const logger = createLogger({
  level: serverConfig.logLevel,
  format: combine(
    format((info) => {
      /* eslint no-param-reassign: 0 */
      info.level = info.level.toUpperCase();
      return info;
    })(),
    colorize(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS',
    }),
    logFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;

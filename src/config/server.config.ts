require('dotenv').config();

export default {
  env: (process.env.NODE_ENV = 'development'),
  protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
  host: (process.env.SERVER_HOST = 'localhost'),
  port: (process.env.SERVER_PORT = '9000'),
  logLevel: (process.env.LOG_LEVEL = 'debug'),
};

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes';
import logger from './logger';
import serverConfig from '../config/server.config';

createConnection()
  .then(async () => {
    logger.info('connection established with the database');

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(morgan('dev'));
    app.use(deserializeUser);
    routes(app);

    app.listen(serverConfig.port, () => {
      logger.info(
        `server is up at ${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}`,
      );
    });
  })

  .catch((error) => {
    logger.error(error);
    logger.error('Unable to connect to database');
  });

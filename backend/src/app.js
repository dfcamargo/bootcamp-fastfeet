import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { resolve } from 'path';

import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import sentryConfig from './config/sentry';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    /** Monitoramento de erros */
    Sentry.init(sentryConfig);
    this.server.use(Sentry.Handlers.requestHandler());

    this.middleware();

    this.routes();

    /** Monitoramento de erro */
    this.server.use(Sentry.Handlers.errorHandler());

    /** Tratamento de exceções */
    this.exceptionHadler();
  }

  middleware() {
    this.server.use(cors());
    /** corpo da requisição em formato json */
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    /** carrega as rotas */
    this.server.use(routes);
  }

  exceptionHadler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;

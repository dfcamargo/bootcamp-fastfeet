import express from 'express';
import cors from 'cors';
import { resolve } from 'path';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middleware();

    this.routes();
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
}

export default new App().server;

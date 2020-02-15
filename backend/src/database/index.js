import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import Order from '../app/models/Order';

import File from '../app/models/File';

const models = [User, Recipient, Deliveryman, Order, File];

class Database {
  constructor() {
    /** conexão com banco de dados */
    this.init();
  }

  init() {
    /** cria conexão com o banco de dados */
    this.connection = new Sequelize(databaseConfig);

    /** inicia os models da aplicação */
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();

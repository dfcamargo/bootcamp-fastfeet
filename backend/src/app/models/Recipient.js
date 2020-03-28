import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        address_number: Sequelize.INTEGER,
        address_note: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        full_address: {
          type: Sequelize.VIRTUAL,
          get() {
            // Rua Dos Pássaros, 131, Bloco A - Apartamento 37, São Paulo - SP. CEP: 13800888
            return `${this.address}, ${this.address_number},${this
              .address_note && `${this.address_note},`} ${this.city} - ${
              this.state
            }. CEP: ${this.zipcode}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;

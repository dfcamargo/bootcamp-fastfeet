import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        signature_id: Sequelize.INTEGER,
        product: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            /**
             * Se a data de cancelamento está preenchida, já foi realizada tentativas de entrega: "Cancelado"
             * Se a data de entrega está preenchida, o produto já foi entregue: "Entregue"
             * Se a data de início está preenchida, o produto já foi retirado: "Retirada"
             * Se nenhuma data está preenchida, o produto está pendente: "Pendente"
             */
            if (this.canceled_at) {
              return 'cancelado';
            }
            if (this.end_date) {
              return 'entregue';
            }
            if (this.start_date) {
              return 'retirada';
            }
            return 'pendente';
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });

    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });

    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
  }
}

export default Order;

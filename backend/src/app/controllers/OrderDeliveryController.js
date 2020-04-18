import { Op } from 'sequelize';

import Order from '../models/Order';

import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class OrderDeliveryController {
  /** consulta encomendas por entregador */
  async index(req, res) {
    const { id: deliveryman_id } = req.params;

    const { delivered } = req.query;

    /** consulta e retorna as encomendas por entregador */
    const orders = await Order.findAll({
      where: {
        deliveryman_id,
        canceled_at: null,
        end_date: delivered ? { [Op.not]: null } : { [Op.is]: null },
      },
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'status',
      ],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'address',
            'address_number',
            'address_note',
            'city',
            'state',
            'zipcode',
            'full_address',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new OrderDeliveryController();

import { Op } from 'sequelize';
import * as Yup from 'yup';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class OrderController {
  async index(req, res) {
    const { q: search } = req.query;

    /** retorna todas as ordens */
    const orders = await Order.findAll({
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'status',
      ],
      where: search
        ? {
            product: { [Op.like]: `%${search}%` },
          }
        : {},
      order: ['id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'zipcode',
            'address',
            'address_number',
            'address_note',
            'city',
            'state',
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

  async store(req, res) {
    /** esquema de validação dos campos */
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    /** retorna a encomenda criada */
    const {
      id,
      recipient_id,
      deliveryman_id,
      product,
      status,
    } = await Order.create(req.body);

    // enviar e-mail

    return res.json({ id, recipient_id, deliveryman_id, product, status });
  }

  async update(req, res) {
    res.json({ ok: true });
  }

  async delete(req, res) {
    // enviar e-mail
    const { id } = req.params;

    /** remove ordem */
    await Order.destroy({ where: { id } });

    return res.json();
  }
}

export default new OrderController();

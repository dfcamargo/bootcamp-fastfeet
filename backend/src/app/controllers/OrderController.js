import { Op } from 'sequelize';
import * as Yup from 'yup';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import Queue from '../../lib/Queue';
import ConfirmationMail from '../jobs/ConfirmationMail';

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

    /** cria a encomenda */
    const { id } = await Order.create(req.body);

    /** consulta a encomenda criada com seus detalhes */
    const order = await Order.findOne({
      where: { id },
      attributes: ['id', 'product', 'status'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
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
      ],
    });

    /** envio de e-mail */
    Queue.add(ConfirmationMail.key, {
      order,
    });

    return res.json(order);
  }

  async update(req, res) {
    res.json({ ok: true });
  }

  async delete(req, res) {
    const { id } = req.params;

    /** remove ordem */
    await Order.destroy({ where: { id } });

    return res.json();
  }
}

export default new OrderController();

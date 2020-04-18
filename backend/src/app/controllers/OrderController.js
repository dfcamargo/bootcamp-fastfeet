import { Op } from 'sequelize';
import * as Yup from 'yup';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import Queue from '../../lib/Queue';
import ConfirmationMail from '../jobs/ConfirmationMail';

class OrderController {
  /** consulta encomendas  */
  async index(req, res) {
    /** controle de paginação */
    const { page = 1 } = req.query;

    /** registros por página */
    const per_page = 10;

    /** monta instrução condicional caso seja informado por parâmetro */
    const where = req.query.q
      ? { product: { [Op.iLike]: `%${req.query.q}%` } }
      : {};

    /** consulta e retorna encomendas */
    const { rows: orders, count } = await Order.findAndCountAll({
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'status',
      ],
      order: [['createdAt', 'DESC']],
      where,
      limit: per_page,
      offset: (page - 1) * per_page,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
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
          attributes: ['id', 'name', 'email'],
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

    return res.json({
      orders,

      /** retorna controle de paginação */
      per_page,
      current_page: Number(page),
      total_page: Math.ceil(count / per_page),
    });
  }

  /** adiciona encomenda */
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

    /** envio de e-mail para o entregador */
    Queue.add(ConfirmationMail.key, {
      order,
    });

    /** retorna dados da encomenda criada */
    return res.json(order);
  }

  /** altera encomenda */
  async update(req, res) {
    const { id } = req.params;

    /** pesquisa encomenda */
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    /** esquema de validação dos campos */
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    /** atualiza e retorna a encomenda */
    await order.update(req.body);

    return res.json(order);
  }

  /** exclui encomenda */
  async delete(req, res) {
    const { id } = req.params;

    /** verifica se a encomenda existe */
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    /** remove encomenda */
    await order.destroy();

    return res.json();
  }
}

export default new OrderController();

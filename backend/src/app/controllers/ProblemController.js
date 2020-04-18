import DeliveryProblem from '../Schema/DeliveryProblem';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class ProblemController {
  /** lista todos os problemas de todas as encomendas */
  async index(req, res) {
    /** controle de paginação */
    const { page = 1 } = req.query;

    /** registros por página */
    const per_page = 10;

    /** total de registros */
    const count = await DeliveryProblem.count();

    const problems = await DeliveryProblem.find()
      .limit(per_page)
      .skip((page - 1) * per_page)
      .sort({
        createdAt: 'desc',
      });

    return res.json({
      problems,

      /** retorna controle de paginação */
      per_page,
      current_page: Number(page),
      total_page: Math.ceil(count / per_page),
    });
  }

  /** cancela a encomenda */
  async delete(req, res) {
    const { id } = req.params;

    /** verifica se existe o problema */
    const problem = await DeliveryProblem.findById(id);

    if (!problem) {
      return res.status(400).json({ message: 'Problem not found' });
    }

    /** verifica se existe a ordem */
    const order = await Order.findOne({
      where: { id: problem.order_id },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name'],
        },
      ],
    });

    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    /** verifica se a ordem já foi cancelada */
    if (order.canceled_at) {
      return res.status(400).json({ message: 'Order already canceled' });
    }

    /** atualiza a data de cancelamento da ordem */
    order.canceled_at = new Date();

    await order.save();

    /** envio de e-mail de cancelamento */
    await Queue.add(CancellationMail.key, {
      order,
      description: problem.description,
    });

    return res.json(order);
  }
}

export default new ProblemController();

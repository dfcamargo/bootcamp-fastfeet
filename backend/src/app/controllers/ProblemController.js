import DeliveryProblem from '../Schema/DeliveryProblem';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class ProblemController {
  /** lista todos os problemas de todas as encomendas */
  async index(req, res) {
    const problems = await DeliveryProblem.find().sort({ createdAt: 'desc' });

    return res.json(problems);
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

    /** envio de e-mail */
    await Queue.add(CancellationMail.key, {
      order,
      description: problem.description,
    });

    return res.json(order);
  }
}

export default new ProblemController();

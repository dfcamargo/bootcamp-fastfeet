import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';

class ProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll();

    return res.json(problems);
  }

  /** cancela a encomenda */
  async delete(req, res) {
    const { id: problem_id } = req.params;

    /** verifica se existe o problema */
    const problem = await DeliveryProblem.findByPk(problem_id);

    if (!problem) {
      return res.status(400).json({ message: 'Problem not found' });
    }

    const { order_id } = problem;

    /** verifica se existe a ordem */
    const order = await Order.findByPk(order_id);

    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    /** verifica se a ordem já foi cancelada */
    if (order.canceled_at) {
      return res.status(400).json({ message: 'Order already canceled' });
    }

    /** atualiza a data de cancelamento da ordem */
    const {
      status,
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
    } = await order.update({ canceled_at: new Date() });

    // enviar e-mail

    return res.json({
      order_id,
      status,
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
    });
  }
}

export default new ProblemController();

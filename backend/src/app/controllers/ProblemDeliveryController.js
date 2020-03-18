import DeliveryProblem from '../models/DeliveryProblem';

import Order from '../models/Order';

class ProblemDeliveryController {
  async index(req, res) {
    const { id: order_id } = req.params;

    const problems = await DeliveryProblem.findAll({
      where: {
        order_id,
      },
      attributes: ['id', 'description'],
      include: {
        model: Order,
        as: 'order',
        attributes: [
          'id',
          'status',
          'recipient_id',
          'deliveryman_id',
          'product',
          'start_date',
          'canceled_at',
        ],
      },
    });

    return res.json(problems);
  }

  async store(req, res) {
    res.json();
  }
}

export default new ProblemDeliveryController();

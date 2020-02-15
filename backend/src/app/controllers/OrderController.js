import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class OrderController {
  async index(req, res) {
    /** retorna todas as ordens */
    const orders = await Order.findAll({
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
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
    const order = await Order.create(req.body);
    return res.json(order);
  }

  async update(req, res) {
    res.json({ ok: true });
  }

  async delete(req, res) {
    res.json({ ok: true });
  }
}

export default new OrderController();

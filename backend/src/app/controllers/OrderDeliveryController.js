import Order from '../models/Order';

import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class OrderDeliveryController {
  async index(req, res) {
    const { id: deliveryman_id } = req.params;

    const request = await Order.findAll({
      where: { deliveryman_id, canceled_at: null, end_date: null },
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

    return res.json(request);
  }
}

export default new OrderDeliveryController();

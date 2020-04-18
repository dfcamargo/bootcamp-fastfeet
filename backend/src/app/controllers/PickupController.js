import { Op } from 'sequelize';
import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  isAfter,
  isBefore,
} from 'date-fns';

import Order from '../models/Order';

class PickupController {
  /** atualiza ordem com as informações de retirada */
  async update(req, res) {
    const { id } = req.params;

    /** verifica se a encomenda existe */
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    const { deliveryman_id } = order;

    /** data de retirada */
    const start_date = new Date();

    /** verifica se a quantidade máxima de retiradas do dia foi excedida */
    const maxCount = await Order.count({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(start_date), endOfDay(start_date)],
        },
      },
    });

    if (maxCount === 5) {
      return res.status(400).json({ message: 'Daily limit exceeded' });
    }

    /** verifica horário da retirada está entre 08h00 às 18h00 */
    const minTime = setSeconds(setMinutes(setHours(start_date, 8), 0), 0);
    const maxTime = setSeconds(setMinutes(setHours(start_date, 18), 0), 0);

    if (isBefore(start_date, minTime) || isAfter(start_date, maxTime)) {
      return res.status(400).json({ message: 'Out of pickup time' });
    }

    /** atualiza ordem */
    const { status, recipient_id, product } = await order.update(
      {
        start_date,
      },
      { where: { id } }
    );

    return res.json({
      status,
      recipient_id,
      deliveryman_id,
      product,
      start_date,
    });
  }
}

export default new PickupController();

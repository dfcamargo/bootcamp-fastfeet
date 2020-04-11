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
    const amount = await Order.count({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(start_date), endOfDay(start_date)],
        },
      },
    });

    if (amount === 5) {
      return res.status(400).json({ message: 'Daily limit exceeded' });
    }

    /** verifica horário da retirada 08h00 às 18h00 */
    const start_officeHour = setSeconds(
      setMinutes(setHours(start_date, 8), 0),
      0
    );
    const end_officeHour = setSeconds(
      setMinutes(setHours(start_date, 18), 0),
      0
    );

    if (
      isBefore(start_date, start_officeHour) ||
      isAfter(start_date, end_officeHour)
    ) {
      return res.status(400).json({ message: 'Out of office hours' });
    }

    /** atualiza ordem */
    const { status, recipient_id, product, canceled_at } = await order.update(
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
      canceled_at,
    });
  }
}

export default new PickupController();

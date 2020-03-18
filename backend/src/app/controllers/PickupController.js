import { Op } from 'sequelize';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import * as Yup from 'yup';

import Order from '../models/Order';

class PickupController {
  async update(req, res) {
    /** esquema de validação dos campos */
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const { start_date } = req.body;
    const { id } = req.params;

    /** verifica ordem */
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    const { deliveryman_id } = order;

    /** verifica se a quantidade máxima de retiradas do dia foi excedida */
    const amount = await Order.count({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [
            startOfDay(parseISO(start_date)),
            endOfDay(parseISO(start_date)),
          ],
        },
      },
    });

    if (amount === 5) {
      return res.status(400).json({ message: 'Daily limit exceeded' });
    }

    /** verifica horário da retirada 08h00 às 18h00 */

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

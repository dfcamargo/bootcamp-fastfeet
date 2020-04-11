import * as Yup from 'yup';

import Order from '../models/Order';

class DeliveredController {
  async update(req, res) {
    /** esquema de validação dos campos */
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const { signature_id } = req.body;
    const { id } = req.params;

    /** data de entrega */
    const end_date = new Date();

    /** verifica se a encomenda existe */
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    /** atualiza ordem */
    const {
      status,
      recipient_id,
      deliveryman_id,
      product,
    } = await order.update({ end_date, signature_id }, { where: { id } });

    return res.json({
      status,
      recipient_id,
      deliveryman_id,
      product,
      end_date,
    });
  }
}

export default new DeliveredController();

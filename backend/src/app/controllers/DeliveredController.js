import * as Yup from 'yup';

import Order from '../models/Order';

class DeliveredController {
  /** atualiza ordem com as informações de entrega */
  async update(req, res) {
    /** esquema de validação dos campos */
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const { id } = req.params;

    /** verifica se a encomenda existe */
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    const { signature_id } = req.body;

    /** data de entrega */
    const end_date = new Date();

    /** atualiza ordem */
    await order.update({ end_date, signature_id }, { where: { id } });

    /** retorna informações da orderm */
    return res.json(order);
  }
}

export default new DeliveredController();

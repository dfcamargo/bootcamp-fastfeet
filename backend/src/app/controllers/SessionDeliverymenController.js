import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class SessionDeliverymenController {
  /** criação da sessão de entregador */
  async store(req, res) {
    /** esquema de validação dos campos */
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validations fails' });
    }

    /** valida a autenticação */
    const { id } = req.body;

    const user = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email', 'created_at'],
      include: {
        model: File,
        as: 'avatar',
        attributes: ['name', 'path', 'url'],
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    return res.json({
      user,
    });
  }
}

export default new SessionDeliverymenController();

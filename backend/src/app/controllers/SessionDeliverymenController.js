import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class SessionDeliverymenController {
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

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['name', 'email', 'created_at'],
      include: {
        model: File,
        as: 'avatar',
        attributes: ['name', 'path', 'url'],
      },
    });

    if (!deliveryman) {
      return res.status(400).json({ message: 'User not found' });
    }

    const { name, email, avatar } = deliveryman;

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
      },
    });
  }
}

export default new SessionDeliverymenController();

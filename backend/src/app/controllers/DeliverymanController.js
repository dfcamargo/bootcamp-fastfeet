import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    /** retorna todos os entregadores */
    const deliveryman = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      include: {
        model: File,
        as: 'avatar',
        attributes: ['name', 'path', 'url'],
      },
    });

    res.json(deliveryman);
  }

  async store(req, res) {
    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async update(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    await deliveryman.update(req.body);

    return res.json(deliveryman);
  }

  async delete(req, res) {
    res.json({ ok: true });
  }
}

export default new DeliverymanController();

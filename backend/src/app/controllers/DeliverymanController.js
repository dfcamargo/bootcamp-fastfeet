import { Op } from 'sequelize';
import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { q: search } = req.query;

    /** retorna todos os entregadores */
    const deliverymen = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      /** pesquisa pelo nome do entregador */
      where: search
        ? {
            name: { [Op.like]: `%${search}%` },
          }
        : {},
      include: {
        model: File,
        as: 'avatar',
        attributes: ['name', 'path', 'url'],
      },
    });

    res.json(deliverymen);
  }

  async store(req, res) {
    /** esquema de validação dos campos */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const { email } = req.body;

    /** verifica se o e-mail não foi cadastrado */
    const isRegistered = await Deliveryman.findOne({ where: { email } });
    if (isRegistered) {
      return res
        .status(400)
        .json({ message: "Deliveryman's e-mail already exists" });
    }

    /** retorna o entregador criado */
    const { id, name, avatar_id } = await Deliveryman.create(req.body);

    return res.status(201).json({ id, name, email, avatar_id });
  }

  async update(req, res) {
    const { id } = req.params;

    /** pesquisa entregador */
    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ message: 'Deliveryman not found' });
    }

    /** esquema de validação dos campos */
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const { email } = req.body;

    /** se o campo e-mail for preecnhido, verifica se o e-mail não foi cadastrado */
    if (email && email !== deliveryman.email) {
      const isRegistered = await Deliveryman.findOne({ where: { email } });
      if (isRegistered) {
        return res
          .status(400)
          .json({ message: "Deliveryman's e-mail already exists" });
      }
    }

    /** retorna o entregador criado */
    const { name, avatar_id } = await deliveryman.update(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async delete(req, res) {
    const { id } = req.params;

    /** remove entregador */
    await Deliveryman.destroy({ where: { id } });

    res.json();
  }
}

export default new DeliverymanController();

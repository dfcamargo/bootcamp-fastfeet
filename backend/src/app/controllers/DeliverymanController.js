import { Op } from 'sequelize';
import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  /** consulta entregadores */
  async index(req, res) {
    /** controle de paginação */
    const { page = 1 } = req.query;

    /** registros por página */
    const per_page = 10;

    /** monta instrução condicional caso seja informado por parâmetro */
    const where = req.query.q
      ? { name: { [Op.iLike]: `%${req.query.q}%` } }
      : {};

    /** consulta e retornar entregadores */
    const { rows: deliverymen, count } = await Deliveryman.findAndCountAll({
      attributes: ['id', 'name', 'email'],
      order: ['id'],
      where,
      limit: per_page,
      offset: (page - 1) * per_page,
      include: {
        model: File,
        as: 'avatar',
        attributes: ['id', 'name', 'path', 'url'],
      },
    });

    return res.json({
      deliverymen,

      /** retorna controle de paginação */
      per_page,
      current_page: Number(page),
      total_page: Math.ceil(count / per_page),
    });
  }

  /** adiciona novo entregar */
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

  /** altera entregador */
  async update(req, res) {
    const { id } = req.params;

    /** pesquisa entregador */
    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ message: 'Deliveryman not found' });
    }

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

    /** se o campo e-mail for preenchido, verifica se o e-mail não foi cadastrado */
    if (email && email !== deliveryman.email) {
      const isRegistered = await Deliveryman.findOne({ where: { email } });
      if (isRegistered) {
        return res
          .status(400)
          .json({ message: "Deliveryman's e-mail already exists" });
      }
    }

    /** retorna o entregador atualizado */
    const { name, avatar_id } = await deliveryman.update(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  /** exclui entregador */
  async delete(req, res) {
    const { id } = req.params;

    /** verifica se o entregador existe */
    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ message: 'Deliveryman not found' });
    }

    /** remove entregador */
    await deliveryman.destroy();

    return res.json();
  }
}

export default new DeliverymanController();

import { Op } from 'sequelize';
import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  /** consulta os destinatários */
  async index(req, res) {
    /** controle de paginação */
    const { page = 1 } = req.query;

    /** registros por página */
    const per_page = 10;

    /** monta instrução condicional caso seja informado por parâmetro */
    const where = req.query.q
      ? { name: { [Op.iLike]: `%${req.query.q}%` } }
      : {};

    /** consulta e retorna os destinatários */
    const { rows: recipients, count } = await Recipient.findAndCountAll({
      attributes: [
        'id',
        'name',
        'address',
        'address_number',
        'address_note',
        'city',
        'state',
        'zipcode',
      ],
      where,
    });

    return res.json({
      recipients,

      /** retorna controle de paginação */
      per_page,
      current_page: Number(page),
      total_page: Math.ceil(count / per_page),
    });
  }

  /** adiciona destinatário */
  async store(req, res) {
    /** esquema de validação dos campos */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      address_number: Yup.number().integer(),
      address_note: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    /** cria destinatário */
    const {
      name,
      address,
      address_number,
      address_note,
      city,
      state,
      zipcode,
    } = await Recipient.create(req.body);

    /** retorna informações do destinatário criado */
    return res.status(201).json({
      name,
      address,
      address_number,
      address_note,
      city,
      state,
      zipcode,
    });
  }

  /** altera destinatário */
  async update(req, res) {
    /** verifica se existe o destinatário */
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ message: 'Recipient not found' });
    }

    /** esquema de validação dos campos */
    const schema = Yup.object().shape({
      name: Yup.string(),
      address: Yup.string(),
      address_number: Yup.number().integer(),
      address_note: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zipcode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    /** atualiza dados do destinatário */
    const {
      name,
      address,
      address_number,
      address_note,
      city,
      state,
      zipcode,
    } = await recipient.update(req.body);

    /** retorna destinatário atualizado */
    return res.json({
      name,
      address,
      address_number,
      address_note,
      city,
      state,
      zipcode,
    });
  }

  /** exclui destinatário */
  async delete(req, res) {
    const { id } = req.params;

    /** verifica se o destinatário existe */
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ message: 'Recipient not found' });
    }

    /** remove destinatário */
    await recipient.destroy();

    return res.json();
  }
}

export default new RecipientController();

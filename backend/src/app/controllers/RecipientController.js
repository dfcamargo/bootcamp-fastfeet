import { Op } from 'sequelize';
import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { q: search } = req.query;

    /** retorna todos os entregadores */
    const recipients = await Recipient.findAll({
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
      /** pesquisa pelo nome do entregador */
      where: search
        ? {
            name: { [Op.like]: `%${search}%` },
          }
        : {},
    });

    return res.json(recipients);
  }

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

    /** retorna informações do destinatário criado */
    const {
      name,
      address,
      address_number,
      address_note,
      city,
      state,
      zipcode,
    } = await Recipient.create(req.body);

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

  async delete(req, res) {
    const { id } = req.params;

    /** remove destinatário */
    await Recipient.destroy({ where: { id } });

    return res.json();
  }
}

export default new RecipientController();

import * as Yup from 'yup';

import DeliveryProblem from '../Schema/DeliveryProblem';

class ProblemDeliveryController {
  /** lista todos os problemas de uma encomenda */
  async index(req, res) {
    const { id: order_id } = req.params;

    const problems = await DeliveryProblem.find({
      order_id,
    }).sort({ createdAt: 'desc' });

    return res.json(problems);
  }

  /** cria um novo problema */
  async store(req, res) {
    const { id: order_id } = req.params;

    /** processo devalidação dos dados */
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    /** cria um novo problema de entrega */
    const { description } = req.body;

    const problem = await DeliveryProblem.create({
      description,
      order_id,
    });

    return res.json(problem);
  }
}

export default new ProblemDeliveryController();

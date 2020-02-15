import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  /** verifica se existe token na requisição */
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  /** separa Bearer do código do token */
  const [, token] = authorization.split(' ');

  try {
    /** verifica se o token é válido */
    const { id } = await promisify(jwt.verify)(token, authConfig.secret);

    /** adiciona o código do usuário no corpo da requisição */
    req.userId = id;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};

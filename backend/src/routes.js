import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

/** Middlewares */
import authMiddleware from './app/middlewares/auth';

/** Rotas */
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import DeliveryController from './app/controllers/DeliveryController';
import FileController from './app/controllers/FileController';

const routes = new Router();
/** middleware para tratamento de arquivos */
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.json({ message: 'Welcome API' });
});

/** Rotas de autenticação */
routes.post('/session', SessionController.store);

routes.get('/deliveryman/:id/deliveries', DeliveryController.index);

/** Rotas autenticadas */
routes.use(authMiddleware);

routes.post('/file', upload.single('file'), FileController.store);

routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

export default routes;

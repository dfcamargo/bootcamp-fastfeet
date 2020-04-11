import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

/** Middlewares */
import authMiddleware from './app/middlewares/auth';

/** Rotas */
import SessionController from './app/controllers/SessionController';
import SessionDeliverymenController from './app/controllers/SessionDeliverymenController';

import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';

import OrderController from './app/controllers/OrderController';
import OrderDeliveryController from './app/controllers/OrderDeliveryController';

import ProblemController from './app/controllers/ProblemController';
import ProblemDeliveryController from './app/controllers/ProblemDeliveryController';

import PickupController from './app/controllers/PickupController';
import DeliveredController from './app/controllers/DeliveredController';

const routes = new Router();
/** middleware para tratamento de arquivos */
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.json({ message: 'Welcome API' });
});

/** Rotas de autenticação */
routes.post('/session', SessionController.store);

/** MOBILE */
routes.post('/deliverymen/session', SessionDeliverymenController.store);

routes.get('/deliverymen/:id/deliveries', OrderDeliveryController.index);

routes.get('/deliveries/:id/problems', ProblemDeliveryController.index);
routes.post('/deliveries/:id/problems', ProblemDeliveryController.store);

routes.put('/deliveries/:id/pickup', PickupController.update);

routes.put('/deliveries/:id/delivered', DeliveredController.update);

/** Rotas autenticadas */
routes.use(authMiddleware);

routes.post('/file', upload.single('file'), FileController.store);

/** destinatário */
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

/** entregador */
routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

/** encomendas */
routes.get('/deliveries', OrderController.index);
routes.post('/deliveries', OrderController.store);
routes.put('/deliveries/:id', OrderController.update);
routes.delete('/deliveries/:id', OrderController.delete);

/** problemas */
routes.get('/problems', ProblemController.index);
routes.delete('/problems/:id/cancel_delivery', ProblemController.delete);

export default routes;

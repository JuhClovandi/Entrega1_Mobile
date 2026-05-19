import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { ServiceController } from '../controllers/ServiceController';

const routes = Router();

routes.post('/register/user', UserController.registerUser);
routes.post('/register/pro', UserController.registerPro);
routes.post('/login', UserController.login);
routes.post('/profissional/servicos', ServiceController.createService);

export default routes;
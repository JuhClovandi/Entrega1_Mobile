import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { ServiceController } from '../controllers/ServiceController';

const router = Router();

router.post('/register/user', UserController.registerUser);
router.post('/register/pro', UserController.registerPro);
router.post('/login', UserController.login);
router.post('/profissional/servicos', ServiceController.createService);
router.get('/profissional/servicos', ServiceController.listProServices);
router.delete('/api/usuarios/:id', UserController.deleteUser);
router.delete('/profissional/servicos/:id', ServiceController.deleteService);

export default router;
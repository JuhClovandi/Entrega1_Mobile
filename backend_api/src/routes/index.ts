import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { ServiceController } from '../controllers/ServiceController';
import { BookingController } from '../controllers/BookingController';

const router = Router();

router.post('/register/user', UserController.registerUser);
router.post('/register/pro', UserController.registerPro);
router.post('/login', UserController.login);
router.post('/user/delete', UserController.deleteUser);
router.post('/profissional/servicos', ServiceController.createService);
router.get('/profissional/servicos', ServiceController.listAllServices);
router.delete('/profissional/servicos/:id', ServiceController.deleteService);
router.post('/servicos/agendar', BookingController.createBooking);

export default router;
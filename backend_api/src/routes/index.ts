import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { ServiceController } from '../controllers/ServiceController';
import { BookingController } from '../controllers/BookingController';

const router = Router();

router.post('/register/user', UserController.registerUser);
router.post('/register/pro', UserController.registerPro);
router.post('/login', UserController.login);
router.post('/user/delete', UserController.deleteUser);
router.put('/user/update', UserController.updateUser);

router.post('/profissional/servicos', ServiceController.createService);
router.get('/profissional/servicos', ServiceController.listAllServices);
router.delete('/profissional/servicos/:id', ServiceController.deleteService);

router.post('/servicos/agendar', BookingController.createBooking);
router.get('/servicos/agendados', BookingController.listMyBookings);
router.get('/servicos/:servicoId/horarios-ocupados', ServiceController.getHorariosOcupados);
router.delete('/servicos/agendar/:id', BookingController.cancelBooking);

router.get('/profissional/agendamentos', ServiceController.listAgendamentosDoServico);

export default router;
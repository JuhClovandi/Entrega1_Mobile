import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { LocationController } from '../controllers/LocationController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Rotas Públicas
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Rotas Protegidas (Exige o Token no Header: Authorization: Bearer TOKEN)
router.get('/ufs', authMiddleware, LocationController.listUFs);
router.post('/ufs', authMiddleware, LocationController.createUF);

router.get('/cidades', authMiddleware, LocationController.listCidades);
router.post('/cidades', authMiddleware, LocationController.createCidade);

export default router;
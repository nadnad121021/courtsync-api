import { Router } from 'express';
import roleController from './role.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware(),roleController.getAll);
router.get('/:id', authMiddleware(), roleController.getById);
router.post('/', authMiddleware(), roleController.create);
router.patch('/:id', authMiddleware(), roleController.update);
router.delete('/:id', authMiddleware(), roleController.delete);

export default router;
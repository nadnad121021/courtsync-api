import { Router } from 'express';
import bookingController from './booking.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware(), bookingController.getAll);
router.get('/:id', authMiddleware(), bookingController.getById);
router.post('/', authMiddleware(), bookingController.create);
router.patch('/:id',authMiddleware(), bookingController.update);
router.delete('/:id', authMiddleware(), bookingController.delete);

export default router;

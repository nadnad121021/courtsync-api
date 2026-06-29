import { Router } from 'express';
import paymentController from './payment.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware(),paymentController.getAll);
router.get('/booking/:bookingId',authMiddleware(), paymentController.getByBookingId);
router.get('/:id', authMiddleware(), paymentController.getById);
router.post('/', authMiddleware(), paymentController.create);
router.patch('/:id', authMiddleware(), paymentController.update);
router.patch('/:id/paid', authMiddleware(), paymentController.markAsPaid);
router.patch('/:id/failed', authMiddleware(), paymentController.markAsFailed);
router.delete('/:id',authMiddleware(), paymentController.delete);

export default router;
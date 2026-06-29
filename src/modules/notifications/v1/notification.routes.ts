import { Router } from 'express';
import notificationController from './notification.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware(),notificationController.getAll);
router.get('/user/:userId',authMiddleware(), notificationController.getByUserId);
router.get('/:id', authMiddleware(), notificationController.getById);
router.post('/', authMiddleware(), notificationController.create);
router.patch('/:id', authMiddleware(), notificationController.update);
router.patch('/:id/sent', authMiddleware(), notificationController.markAsSent);
router.patch('/:id/read', authMiddleware(), notificationController.markAsRead);
router.patch('/:id/failed',authMiddleware(), notificationController.markAsFailed);
router.delete('/:id', authMiddleware(), notificationController.delete);

export default router;
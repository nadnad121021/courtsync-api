import { Router } from 'express';
import notificationController from './notification.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';
import { requirePermissions } from '@core/middlewares/rbac.middleware';
import { PERMISSIONS } from '@core/permissions/permission.constants';
import { validateDto } from '@core/middlewares/validate.dto';
import { CreateNotificationDto, UpdateNotificationDto } from '../notification.dto';


const router = Router();

router.get('/', authMiddleware(),requirePermissions(PERMISSIONS.NOTIFICATIONS_READ), notificationController.getAll);
router.get('/user/:userId',authMiddleware(), requirePermissions(PERMISSIONS.NOTIFICATIONS_READ), notificationController.getByUserId);
router.get('/:id', authMiddleware(), requirePermissions(PERMISSIONS.NOTIFICATIONS_READ), notificationController.getById);
router.post('/', authMiddleware(), requirePermissions(PERMISSIONS.NOTIFICATIONS_CREATE),validateDto(CreateNotificationDto), notificationController.create);
router.patch('/:id', authMiddleware(), requirePermissions(PERMISSIONS.NOTIFICATIONS_UPDATE), validateDto(UpdateNotificationDto,true), notificationController.update);
router.patch('/:id/sent', authMiddleware(), requirePermissions(PERMISSIONS.NOTIFICATIONS_UPDATE), notificationController.markAsSent);
router.patch('/:id/read', authMiddleware(), requirePermissions(PERMISSIONS.NOTIFICATIONS_READ), notificationController.markAsRead);
router.patch('/:id/failed',authMiddleware(), requirePermissions(PERMISSIONS.NOTIFICATIONS_UPDATE), notificationController.markAsFailed);
router.delete('/:id', authMiddleware(), requirePermissions(PERMISSIONS.NOTIFICATIONS_DELETE), notificationController.delete);

export default router;
import { Router } from 'express';
import paymentController from './payment.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';
import { requirePermissions } from '@core/middlewares/rbac.middleware';
import { PERMISSIONS } from '@core/permissions/permission.constants';
import { validateDto } from '@core/middlewares/validate.dto';
import { CreatePaymentDto, UpdatePaymentDto } from '../payment.dto';

const router = Router();

router.get('/', authMiddleware(),requirePermissions(PERMISSIONS.PAYMENTS_READ), paymentController.getAll);
router.get('/booking/:bookingId',authMiddleware(),requirePermissions(PERMISSIONS.PAYMENTS_READ), paymentController.getByBookingId);
router.get('/:id', authMiddleware(),requirePermissions(PERMISSIONS.PAYMENTS_READ), paymentController.getById);
router.post('/', authMiddleware(),requirePermissions(PERMISSIONS.PAYMENTS_CREATE),validateDto(CreatePaymentDto), paymentController.create);
router.patch('/:id', authMiddleware(),requirePermissions(PERMISSIONS.PAYMENTS_UPDATE),validateDto(UpdatePaymentDto, true), paymentController.update);
router.patch('/:id/paid', authMiddleware(),requirePermissions(PERMISSIONS.PAYMENTS_UPDATE), paymentController.markAsPaid);
router.patch('/:id/failed', authMiddleware(),requirePermissions(PERMISSIONS.PAYMENTS_UPDATE), paymentController.markAsFailed);
router.delete('/:id',authMiddleware(),requirePermissions(PERMISSIONS.PAYMENTS_DELETE), paymentController.delete);

export default router;
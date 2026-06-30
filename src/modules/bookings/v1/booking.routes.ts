import { Router } from 'express';
import bookingController from './booking.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';
import { requirePermissions } from '@core/middlewares/rbac.middleware';
import { PERMISSIONS } from '@core/permissions/permission.constants';
import { validateDto } from '@core/middlewares/validate.dto';
import { CreateBookingDto,UpdateBookingDto } from '../booking.dto';

const router = Router();

router.get('/', authMiddleware(), requirePermissions(PERMISSIONS.BOOKINGS_READ), bookingController.getAll);
router.get('/me', authMiddleware(), requirePermissions(PERMISSIONS.BOOKINGS_READ), bookingController.getMyBookings);
router.get('/:id', authMiddleware(), requirePermissions(PERMISSIONS.BOOKINGS_READ), bookingController.getById);
router.post('/', authMiddleware(), requirePermissions(PERMISSIONS.BOOKINGS_CREATE),validateDto(CreateBookingDto), bookingController.create);
router.patch('/:id', authMiddleware(), requirePermissions(PERMISSIONS.BOOKINGS_UPDATE),validateDto(UpdateBookingDto,true), bookingController.update);
router.delete('/:id', authMiddleware(), requirePermissions(PERMISSIONS.BOOKINGS_DELETE), bookingController.delete);

export default router;

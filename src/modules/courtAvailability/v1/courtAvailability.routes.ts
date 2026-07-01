import { Router } from 'express';
import courtAvailabityController from './courtAvailability.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';
import { requirePermissions } from '@core/middlewares/rbac.middleware';
import { PERMISSIONS } from '@core/permissions/permission.constants';


const router = Router();

router.get('/:courtId',authMiddleware(), requirePermissions(PERMISSIONS.COURTS_READ), courtAvailabityController.getAvailability);
router.put('/:courtId',authMiddleware(), requirePermissions(PERMISSIONS.COURTS_READ), courtAvailabityController.updateAvailability);
router.delete('/:courtId',authMiddleware(), requirePermissions(PERMISSIONS.COURTS_READ), courtAvailabityController.resetAvailability);
router.get('/:courtId/available-slots',authMiddleware(), requirePermissions(PERMISSIONS.COURTS_READ), courtAvailabityController.getAvailableSlots);

export default router;
import { Router } from 'express';
import courtController from './court.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';
import { requirePermissions } from '@core/middlewares/rbac.middleware';
import { PERMISSIONS } from '@core/permissions/permission.constants';
import { validateDto } from '@core/middlewares/validate.dto';
import { CreateCourtDto, UpdateCourtDto } from '../court.dto';


const router = Router();

router.get('/',authMiddleware(), requirePermissions(PERMISSIONS.COURTS_READ), courtController.getAll);
router.get('/own',authMiddleware(), requirePermissions(PERMISSIONS.COURTS_READ), courtController.getMyCourts);
router.get('/venue/:venueId',authMiddleware(), requirePermissions(PERMISSIONS.COURTS_READ), courtController.getByVenueId);
router.get('/:id',authMiddleware(), requirePermissions(PERMISSIONS.COURTS_READ), courtController.getById);
router.post('/', authMiddleware(), requirePermissions(PERMISSIONS.COURTS_CREATE),validateDto(CreateCourtDto), courtController.create);
router.patch('/:id', authMiddleware(), requirePermissions(PERMISSIONS.COURTS_UPDATE),validateDto(UpdateCourtDto,true), courtController.update);
router.delete('/:id', authMiddleware(), requirePermissions(PERMISSIONS.COURTS_DELETE), courtController.delete);

export default router;
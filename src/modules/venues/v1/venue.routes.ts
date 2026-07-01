import { Router } from 'express';
import venueController from './venue.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';
import { validateDto } from '@core/middlewares/validate.dto';
import { requirePermissions } from '@core/middlewares/rbac.middleware';
import { PERMISSIONS } from '@core/permissions/permission.constants';
import { CreateVenueDto,UpdateVenueDto } from '../venue.dto';

const router = Router();

router.get('/',authMiddleware(), requirePermissions(PERMISSIONS.VENUES_READ), venueController.getAll);
router.get('/active',authMiddleware(), requirePermissions(PERMISSIONS.VENUES_READ), venueController.getAllActive);
router.get('/own',authMiddleware(), requirePermissions(PERMISSIONS.VENUES_READ), venueController.getMyVenues);
router.get('/:id',authMiddleware(), requirePermissions(PERMISSIONS.VENUES_READ), venueController.getById);
router.post('/', authMiddleware(), requirePermissions(PERMISSIONS.VENUES_CREATE),validateDto(CreateVenueDto), venueController.create);
router.patch('/:id', authMiddleware(), requirePermissions(PERMISSIONS.VENUES_UPDATE),validateDto(UpdateVenueDto,true), venueController.update);
router.delete('/:id', authMiddleware(), requirePermissions(PERMISSIONS.VENUES_DELETE), venueController.delete);

export default router;

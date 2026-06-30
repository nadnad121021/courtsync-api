import { Router } from 'express';
import roleController from './role.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';
import { requirePermissions } from '@core/middlewares/rbac.middleware';
import { PERMISSIONS } from '@core/permissions/permission.constants';
import { validateDto } from '@core/middlewares/validate.dto';
import { CreateRoleDto,UpdateRoleDto } from '../role.dto';


const router = Router();

router.get('/', authMiddleware(),requirePermissions(PERMISSIONS.ROLES_READ), roleController.getAll);
router.get('/:id', authMiddleware(), requirePermissions(PERMISSIONS.ROLES_READ), roleController.getById);
router.post('/', authMiddleware(), requirePermissions(PERMISSIONS.ROLES_CREATE),validateDto(CreateRoleDto), roleController.create);
router.patch('/:id', authMiddleware(), requirePermissions(PERMISSIONS.ROLES_UPDATE),validateDto(UpdateRoleDto, true), roleController.update);
router.delete('/:id', authMiddleware(), requirePermissions(PERMISSIONS.ROLES_DELETE), roleController.delete);

export default router;
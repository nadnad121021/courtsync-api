import { Router } from 'express';
import permissionController from './permission.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';
import { requirePermissions } from '@core/middlewares/rbac.middleware';
import { PERMISSIONS } from '@core/permissions/permission.constants';

const router = Router();

router.get('/', authMiddleware(), requirePermissions(PERMISSIONS.PERMISSIONS_READ), permissionController.getAll);
router.get('/:id',authMiddleware(), requirePermissions(PERMISSIONS.PERMISSIONS_READ), permissionController.getById);
router.post('/',authMiddleware(), requirePermissions(PERMISSIONS.PERMISSIONS_READ), permissionController.create);
router.patch('/:id',authMiddleware(), requirePermissions(PERMISSIONS.PERMISSIONS_UPDATE), permissionController.update);
router.delete('/:id',authMiddleware(), requirePermissions(PERMISSIONS.PERMISSIONS_DELETE), permissionController.delete);

export default router;

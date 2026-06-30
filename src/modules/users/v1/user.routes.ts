import { Router } from 'express';
import { UserController } from './user.controller';
import { validateDto } from '@core/middlewares/validate.dto';
import { authMiddleware } from '@core/middlewares/auth.middleware';
import { CreateUserDto, UpdateUserDto } from '../user.dto';
import { requirePermissions } from '@core/middlewares/rbac.middleware';
import { PERMISSIONS } from '@core/permissions/permission.constants';

const router:any = Router();
const controller = new UserController();

// Protected routes
router.get('/',authMiddleware(),requirePermissions(PERMISSIONS.USERS_READ), controller.getUsers);
router.get('/:id',authMiddleware(),requirePermissions(PERMISSIONS.USERS_READ), controller.getUser);
router.post('/', authMiddleware(), requirePermissions(PERMISSIONS.USERS_CREATE), validateDto(CreateUserDto), controller.createUser);
router.put('/:id', authMiddleware(), requirePermissions(PERMISSIONS.USERS_UPDATE), validateDto(UpdateUserDto, true), controller.updateUser);
router.delete('/:id', authMiddleware(), requirePermissions(PERMISSIONS.USERS_DELETE), controller.deleteUser);
export default router;

import { Router } from 'express';
import permissionController from './permission.controller';

const router = Router();

router.get('/', permissionController.getAll);
router.get('/:id', permissionController.getById);
router.post('/', permissionController.create);
router.patch('/:id', permissionController.update);
router.delete('/:id', permissionController.delete);

export default router;

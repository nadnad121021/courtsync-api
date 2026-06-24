import { Router } from 'express';
import notificationController from './notification.controller';

const router = Router();

router.get('/', notificationController.getAll);
router.get('/:id', notificationController.getById);
router.post('/', notificationController.create);
router.patch('/:id', notificationController.update);
router.delete('/:id', notificationController.delete);

export default router;

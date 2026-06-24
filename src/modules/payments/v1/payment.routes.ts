import { Router } from 'express';
import paymentController from './payment.controller';

const router = Router();

router.get('/', paymentController.getAll);
router.get('/:id', paymentController.getById);
router.post('/', paymentController.create);
router.patch('/:id', paymentController.update);
router.delete('/:id', paymentController.delete);

export default router;

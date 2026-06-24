import { Router } from 'express';
import bookingController from './booking.controller';

const router = Router();

router.get('/', bookingController.getAll);
router.get('/:id', bookingController.getById);
router.post('/', bookingController.create);
router.patch('/:id', bookingController.update);
router.delete('/:id', bookingController.delete);

export default router;

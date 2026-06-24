import { Router } from 'express';
import venueController from './venue.controller';

const router = Router();

router.get('/', venueController.getAll);
router.get('/:id', venueController.getById);
router.post('/', venueController.create);
router.patch('/:id', venueController.update);
router.delete('/:id', venueController.delete);

export default router;

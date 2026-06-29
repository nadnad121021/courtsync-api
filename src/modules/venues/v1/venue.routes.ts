import { Router } from 'express';
import venueController from './venue.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';

const router = Router();

router.get('/',authMiddleware(), venueController.getAll);
router.get('/:id',authMiddleware(), venueController.getById);
router.post('/', authMiddleware(), venueController.create);
router.patch('/:id', authMiddleware(), venueController.update);
router.delete('/:id', authMiddleware(), venueController.delete);

export default router;

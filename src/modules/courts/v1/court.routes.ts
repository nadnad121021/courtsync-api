import { Router } from 'express';
import courtController from './court.controller';
import { authMiddleware } from '@core/middlewares/auth.middleware';

const router = Router();

router.get('/',authMiddleware(), courtController.getAll);
router.get('/venue/:venueId',authMiddleware(), courtController.getByVenueId);
router.get('/:id',authMiddleware(), courtController.getById);
router.post('/', authMiddleware(), courtController.create);
router.patch('/:id', authMiddleware(), courtController.update);
router.delete('/:id', authMiddleware(), courtController.delete);

export default router;
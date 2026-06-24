import { Router } from 'express';
import courtController from './court.controller';

const router = Router();

router.get('/', courtController.getAll);
router.get('/:id', courtController.getById);
router.post('/', courtController.create);
router.patch('/:id', courtController.update);
router.delete('/:id', courtController.delete);

export default router;

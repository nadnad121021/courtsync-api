import { Request, Response, NextFunction } from 'express';
import scheduleService from '../schedule.service';

class ScheduleController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await scheduleService.findAll();

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await scheduleService.findById((req as any).params.id);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await scheduleService.create(req.body);

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await scheduleService.update((req as any).params.id, req.body);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await scheduleService.delete((req as any).params.id);

      return res.json({
        success: true,
        message: 'Schedule deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ScheduleController();

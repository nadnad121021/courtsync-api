import { Request, Response, NextFunction } from 'express';
import venueService from './venue.service';
import { RequestWithUser } from '@modules/auth/auth.interface';

class VenueController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await venueService.findAll();

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
      const data = await venueService.findById((req as any).params.id);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const data = await venueService.create(req.body, req.user?.id as string);

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const data = await venueService.update((req as any).params.id, req.body, req.user?.id as string);

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
      await venueService.delete((req as any).params.id);

      return res.json({
        success: true,
        message: 'Venue deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new VenueController();

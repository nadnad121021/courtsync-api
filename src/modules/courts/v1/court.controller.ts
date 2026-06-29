import { NextFunction, Request, Response } from 'express';
import courtService from '../court.service';

class CourtController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await courtService.findAll();

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
      const data = await courtService.findById(req.params.id as any);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByVenueId(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await courtService.findByVenueId(req.params.venueId as any);

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
      const data = await courtService.create(req.body);

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
      const data = await courtService.update(req.params.id as any, req.body);

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
      await courtService.delete(req.params.id as any);

      return res.json({
        success: true,
        message: 'Court deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CourtController();
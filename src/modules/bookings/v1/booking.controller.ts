import { Request, Response, NextFunction } from 'express';
import bookingService from '../booking.service';
import { RequestWithUser } from '@modules/auth/auth.interface';

class BookingController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await bookingService.findAll();

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async getMyBookings(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const data = await bookingService.getBookingsByFilter({
        ownerId: req.user?.id || '',
      });

      return res.json({
        success: true,
        ...data
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await bookingService.findById((req as any).params.id);

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
      const data = await bookingService.create(req.body, req.user?.id || '');

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
      const data = await bookingService.update((req as any).params.id, req.body);

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
      await bookingService.delete((req as any).params.id);

      return res.json({
        success: true,
        message: 'Booking deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BookingController();

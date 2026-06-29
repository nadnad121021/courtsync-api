import { NextFunction, Request, Response } from 'express';
import paymentService from '../payment.service';

class PaymentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await paymentService.findAll();
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await paymentService.findById(req.params.id as any);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getByBookingId(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await paymentService.findByBookingId(req.params.bookingId as any);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await paymentService.create(req.body);
      return res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await paymentService.update(req.params.id as any, req.body);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async markAsPaid(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await paymentService.markAsPaid(
        req.params.id as any,
        req.body.providerReferenceId
      );

      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async markAsFailed(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await paymentService.markAsFailed(
        req.params.id as any,
        req.body.failedReason
      );

      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await paymentService.delete(req.params.id as any);

      return res.json({
        success: true,
        message: 'Payment deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PaymentController();
import { NextFunction, Request, Response } from 'express';
import notificationService from '../notification.service';

class NotificationController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationService.findAll();
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationService.findById(req.params.id as any);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationService.findByUserId(req.params.userId as any);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationService.create(req.body);
      return res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationService.update(req.params.id as any, req.body);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async markAsSent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationService.markAsSent(req.params.id as any);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationService.markAsRead(req.params.id as any);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async markAsFailed(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationService.markAsFailed(req.params.id as any);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await notificationService.delete(req.params.id as any);

      return res.json({
        success: true,
        message: 'Notification deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();
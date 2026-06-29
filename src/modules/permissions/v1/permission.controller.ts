import { Request, Response, NextFunction } from 'express';
import permissionService from '../permission.service';

class PermissionController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await permissionService.findAll();

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
      const data = await permissionService.findById(req.params.id as any);

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
      const data = await permissionService.create(req.body);

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
      const data = await permissionService.update(req.params.id as any, req.body);

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
      await permissionService.delete(req.params.id as any);

      return res.json({
        success: true,
        message: 'Permission deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PermissionController();

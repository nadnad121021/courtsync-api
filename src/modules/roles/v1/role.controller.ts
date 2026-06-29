import { NextFunction, Request, Response } from 'express';
import roleService from '../role.service';

class RoleController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await roleService.findAll();
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await roleService.findById(req.params.id as any);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await roleService.create(req.body);
      return res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await roleService.update(req.params.id as any, req.body);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await roleService.delete(req.params.id as any);

      return res.json({
        success: true,
        message: 'Role deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RoleController();
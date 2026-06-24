import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { RequestWithUser } from "@modules/auth/auth.interface";

export class AuthController {
  constructor(private authService = new AuthService()) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.login(req.body);
      res.setHeader('authorization', result.token);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  me = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      res.json({ success: true, user: req.user });
    } catch (error) {
      next(error);
    }
  };
}

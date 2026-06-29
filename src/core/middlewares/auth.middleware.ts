import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@core/exceptions/http.exception';
import config  from '@config';
import { UserRepository } from "@modules/users/user.repository"
import { RequestWithUser } from '@modules/auth/auth.interface';
import { verifyAccessToken } from '@core/utils/jwt';

export const authMiddleware = (required = true) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      console.log("🚀 ~ authMiddleware ~ authHeader:", authHeader)

      if (!authHeader) {
        if (!required) return next();
        throw new UnauthorizedException('Missing authorization header');
      }

      let token: string;

      // Support:
      // Authorization: Bearer <token>
      // Authorization: <token>
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7).trim();
      } else {
        token = authHeader.trim();
      }

      if (!token) {
        throw new UnauthorizedException('Missing access token');
      }

      const decoded = verifyAccessToken(token);
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }
      if(!decoded.userData || !decoded.userData.id){
        throw new UnauthorizedException('Invalid token data');
      }
      const userRepo = new UserRepository();
      const user = await userRepo.findById(decoded.userData.id);
      if(!user){
         throw new UnauthorizedException('User not found');
      }
      console.log("🚀 ~ authMiddleware ~ user:", user)
      req.user = user;
      req.token = authHeader;

      next();
    } catch (err: any) {
      next(new UnauthorizedException('Invalid or expired token', err.message));
    }
  };
};

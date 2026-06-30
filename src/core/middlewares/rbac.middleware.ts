import { Response, NextFunction } from 'express';
import { RequestWithUser } from '@modules/auth/auth.interface';
import { ForbiddenException, UnauthorizedException } from '@core/exceptions/http.exception';

export const requirePermissions = (...requiredPermissions: string[]) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const user = req.user;

            if (!user) {
                throw new UnauthorizedException('Authentication required');
            }

            const userPermissions =
                user.roles?.flatMap(role =>
                    role.permissions?.map(permission => permission.code) || []
                ) || [];

            const hasPermission = requiredPermissions.every(permission =>
                userPermissions.includes(permission)
            );

            if (!hasPermission) {
                throw new ForbiddenException(
                    'You do not have permission to access this resource'
                );
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};
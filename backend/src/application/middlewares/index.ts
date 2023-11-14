import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { EnvironementService, ResponseService } from '@services'

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
export class Validation {
    public static authenticate = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization');
        if (!token) {
            return ResponseService.sendUnauthorized(res, 'Unauthorized')
        }
        jwt.verify(token, EnvironementService.jwtConfig.secret, (err: any, user: any) => {
            if (err) {
                return ResponseService.sendForbidden(res, 'Forbidden')
            }

            req.user = user;
            next();
        });
    }
    public static validateRequest = async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return ResponseService.sendBadRequest(res, 'invalid request', errors.array());
        }
        next()
    }
}
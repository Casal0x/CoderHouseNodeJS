import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user.interface';

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  const isAdmin = user && user.role === 'admin';
  isAdmin
    ? next()
    : res.status(401).json({
        error: -1,
        descripcion: `La Ruta ${req.originalUrl} y el metodo ${req.method} no estan autorizados`,
      });
};

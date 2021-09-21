import { Request, Response, NextFunction } from 'express';

const isAdmin = true;
//TODO implement auth

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  isAdmin
    ? next()
    : res.status(401).json({
        error: -1,
        descripcion: `La Ruta ${req.originalUrl} y el metodo ${req.method} no estan autorizados`,
      });
};

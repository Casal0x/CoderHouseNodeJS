import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.admin) {
    next();
  } else {
    res.json({
      error: -1,
      descripcion: `ruta '${req.originalUrl}', metodo '${req.method}' no autorizado.`,
    });
  }
};

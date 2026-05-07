import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = "seu_segredo_aqui"; // Em produção, use .env

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Acesso negado' });

  try {
    const decoded = jwt.verify(token, SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
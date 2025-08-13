import type { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../lib/jwt.js';

export interface AuthUser {
  userId: string;
  email: string;
  roles: string[];
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = header.slice('Bearer '.length);
  const payload = verifyJwt<AuthUser>(token);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  (req as any).user = payload;
  next();
}

export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as AuthUser | undefined;
    if (!user || !user.roles?.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}
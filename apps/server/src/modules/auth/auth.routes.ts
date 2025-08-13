import { Router } from 'express';
import { loginHandler, meHandler, registerHandler } from './auth.controller.js';
import { requireAuth } from '../../middleware/auth.js';

export function buildAuthRouter(): Router {
  const router = Router();

  router.post('/register', ...registerHandler);
  router.post('/login', ...loginHandler);
  router.get('/me', requireAuth, meHandler);

  return router;
}
import { Router } from 'express';
import { chatHandler } from './ai.controller.js';
import { requireAuth } from '../../middleware/auth.js';

export function buildAIIntegrationRouter(): Router {
  const router = Router();
  router.post('/chat', requireAuth, chatHandler);
  return router;
}
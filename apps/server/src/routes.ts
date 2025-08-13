import { Router } from 'express';
import { buildAuthRouter } from './modules/auth/auth.routes.js';
import { buildAIIntegrationRouter } from './modules/ai/ai.routes.js';
import { buildProductRouter } from './modules/products/product.routes.js';
import { buildCustomerRouter } from './modules/customers/customer.routes.js';

export function buildRouter(): Router {
  const router = Router();

  router.use('/auth', buildAuthRouter());
  router.use('/ai', buildAIIntegrationRouter());
  router.use('/products', buildProductRouter());
  router.use('/customers', buildCustomerRouter());

  return router;
}
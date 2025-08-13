import { Router } from 'express';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  listProductsHandler,
  updateProductHandler
} from './product.controller.js';
import { requireAuth, requireRole } from '../../middleware/auth.js';

export function buildProductRouter(): Router {
  const router = Router();
  router.get('/', requireAuth, listProductsHandler);
  router.post('/', requireAuth, requireRole('admin'), ...createProductHandler);
  router.get('/:id', requireAuth, getProductHandler);
  router.put('/:id', requireAuth, requireRole('admin'), ...updateProductHandler);
  router.delete('/:id', requireAuth, requireRole('admin'), deleteProductHandler);
  return router;
}
import { Router } from 'express';
import {
  createCustomerHandler,
  deleteCustomerHandler,
  getCustomerHandler,
  listCustomersHandler,
  updateCustomerHandler
} from './customer.controller.js';
import { requireAuth, requireRole } from '../../middleware/auth.js';

export function buildCustomerRouter(): Router {
  const router = Router();
  router.get('/', requireAuth, listCustomersHandler);
  router.post('/', requireAuth, requireRole('admin'), ...createCustomerHandler);
  router.get('/:id', requireAuth, getCustomerHandler);
  router.put('/:id', requireAuth, requireRole('admin'), ...updateCustomerHandler);
  router.delete('/:id', requireAuth, requireRole('admin'), deleteCustomerHandler);
  return router;
}
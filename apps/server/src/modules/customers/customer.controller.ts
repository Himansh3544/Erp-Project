import type { Request, Response } from 'express';
import { z } from 'zod';
import { Customer } from './customer.model.js';
import { validateBody } from '../../utils/validate.js';
import { CustomerInput, PaginatedQuery } from '@erp/shared/src/index.js';

const querySchema = PaginatedQuery;
const createSchema = CustomerInput;
const updateSchema = CustomerInput.partial();

export const createCustomerHandler = [
  validateBody(createSchema),
  async (req: Request, res: Response) => {
    const data = req.body as z.infer<typeof createSchema>;
    const doc = await Customer.create(data);
    res.status(201).json({ id: doc.id });
  }
];

export async function listCustomersHandler(req: Request, res: Response) {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid query' });
  const { page, pageSize, q } = parsed.data;
  const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
  const total = await Customer.countDocuments(filter);
  const items = await Customer.find(filter)
    .sort({ updatedAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  res.json({ total, items });
}

export async function getCustomerHandler(req: Request, res: Response) {
  const doc = await Customer.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
}

export const updateCustomerHandler = [
  validateBody(updateSchema),
  async (req: Request, res: Response) => {
    const doc = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  }
];

export async function deleteCustomerHandler(req: Request, res: Response) {
  const doc = await Customer.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
}
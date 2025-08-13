import type { Request, Response } from 'express';
import { z } from 'zod';
import { Product } from './product.model.js';
import { validateBody } from '../../utils/validate.js';
import { ProductInput, PaginatedQuery } from '@erp/shared/src/index.js';

const querySchema = PaginatedQuery;
const createSchema = ProductInput;
const updateSchema = ProductInput.partial();

export const createProductHandler = [
  validateBody(createSchema),
  async (req: Request, res: Response) => {
    const data = req.body as z.infer<typeof createSchema>;
    const doc = await Product.create(data);
    res.status(201).json({ id: doc.id });
  }
];

export async function listProductsHandler(req: Request, res: Response) {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid query' });
  }
  const { page, pageSize, q } = parsed.data;
  const filter = q
    ? { $or: [{ name: { $regex: q, $options: 'i' } }, { sku: { $regex: q, $options: 'i' } }] }
    : {};
  const total = await Product.countDocuments(filter);
  const items = await Product.find(filter)
    .sort({ updatedAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  res.json({ total, items });
}

export async function getProductHandler(req: Request, res: Response) {
  const doc = await Product.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
}

export const updateProductHandler = [
  validateBody(updateSchema),
  async (req: Request, res: Response) => {
    const doc = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  }
];

export async function deleteProductHandler(req: Request, res: Response) {
  const doc = await Product.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
}
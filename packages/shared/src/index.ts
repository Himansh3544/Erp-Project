import { z } from 'zod';

export const Role = z.enum(['user', 'admin']);
export type Role = z.infer<typeof Role>;

export const UserShape = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  roles: z.array(Role)
});
export type UserShape = z.infer<typeof UserShape>;

export const ProductInput = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  description: z.string().optional()
});
export type ProductInput = z.infer<typeof ProductInput>;

export const Product = ProductInput.extend({ id: z.string(), createdAt: z.string(), updatedAt: z.string() });
export type Product = z.infer<typeof Product>;

export const CustomerInput = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional()
});
export type CustomerInput = z.infer<typeof CustomerInput>;

export const Customer = CustomerInput.extend({ id: z.string(), createdAt: z.string(), updatedAt: z.string() });
export type Customer = z.infer<typeof Customer>;

export const AIChatMessage = z.object({ role: z.enum(['system', 'user', 'assistant']), content: z.string() });
export type AIChatMessage = z.infer<typeof AIChatMessage>;

export const AIChatRequest = z.object({ messages: z.array(AIChatMessage).min(1) });
export type AIChatRequest = z.infer<typeof AIChatRequest>;

export const PaginatedQuery = z.object({ page: z.coerce.number().min(1).default(1), pageSize: z.coerce.number().min(1).max(100).default(10), q: z.string().optional() });
export type PaginatedQuery = z.infer<typeof PaginatedQuery>;
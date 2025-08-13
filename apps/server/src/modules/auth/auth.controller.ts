import type { Request, Response } from 'express';
import { z } from 'zod';
import { loginUser, registerUser } from './auth.service.js';
import { validateBody } from '../../utils/validate.js';

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const registerHandler = [
  validateBody(registerSchema),
  async (req: Request, res: Response) => {
    const { email, name, password } = req.body as z.infer<typeof registerSchema>;
    const { user, token } = await registerUser({ email, name, password });
    res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name, roles: user.roles },
      token
    });
  }
];

export const loginHandler = [
  validateBody(loginSchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body as z.infer<typeof loginSchema>;
    const { user, token } = await loginUser({ email, password });
    res.json({ user: { id: user.id, email: user.email, name: user.name, roles: user.roles }, token });
  }
];

export async function meHandler(req: Request, res: Response) {
  const user = (req as any).user;
  res.json({ user });
}
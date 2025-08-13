import bcrypt from 'bcryptjs';
import { User } from './user.model.js';
import { signJwt } from '../../lib/jwt.js';

export async function registerUser(params: { email: string; name: string; password: string }) {
  const existing = await User.findOne({ email: params.email });
  if (existing) {
    const error: any = new Error('Email already in use');
    error.status = 409;
    throw error;
  }
  const passwordHash = await bcrypt.hash(params.password, 10);
  const user = await User.create({ email: params.email, name: params.name, passwordHash, roles: ['admin'] });
  const token = signJwt({ userId: user.id, email: user.email, roles: user.roles }, '1d');
  return { user, token };
}

export async function loginUser(params: { email: string; password: string }) {
  const user = await User.findOne({ email: params.email });
  if (!user) {
    const error: any = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }
  const ok = await bcrypt.compare(params.password, user.passwordHash);
  if (!ok) {
    const error: any = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }
  const token = signJwt({ userId: user.id, email: user.email, roles: user.roles }, '1d');
  return { user, token };
}
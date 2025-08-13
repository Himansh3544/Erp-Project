import jwt from 'jsonwebtoken';

const defaultSecret = 'dev_secret_change_me';

export function signJwt(payload: object, expiresIn: string | number = '15m'): string {
  const secret = process.env.JWT_SECRET || defaultSecret;
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const secret = process.env.JWT_SECRET || defaultSecret;
    return jwt.verify(token, secret) as T;
  } catch {
    return null;
  }
}
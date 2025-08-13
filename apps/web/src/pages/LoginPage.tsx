import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiFetch, setAuthToken } from '../lib/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormData) {
    const res = await apiFetch<{ token: string }>(`/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(values)
    });
    setAuthToken(res.token);
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h2 className="text-xl font-semibold">Login</h2>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full border rounded px-3 py-2" type="email" {...register('email')} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input className="w-full border rounded px-3 py-2" type="password" {...register('password')} />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>
        <button
          disabled={isSubmitting}
          className="w-full bg-primary text-white rounded px-3 py-2 hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-sm text-center">
          No account? <Link to="/register" className="text-primary">Register</Link>
        </p>
      </form>
    </div>
  );
}
'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';
import { LogIn } from 'lucide-react';

const initialState = {
  error: '',
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login as any, initialState);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
            <LogIn size={32} color="var(--accent-primary)" />
          </div>
          <h2>Welcome Back</h2>
          <p className="text-muted">Sign in to your account</p>
        </div>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Email, Username, or Roll No
            </label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Enter your identifier" 
              required 
            />
          </div>
          
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              required 
            />
          </div>

          {state?.error && (
            <div style={{ color: 'var(--danger)', fontSize: '0.9rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {state.error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={isPending} style={{ marginTop: '0.5rem' }}>
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

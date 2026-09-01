'use client';

import { logout } from '@/app/actions/auth';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <button onClick={() => logout()} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <LogOut size={18} /> Logout
    </button>
  );
}

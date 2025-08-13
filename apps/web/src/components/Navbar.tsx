import { logout } from '../lib/auth';

export function Navbar() {
  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-4">
      <h1 className="font-semibold">MERN ERP</h1>
      <button
        onClick={logout}
        className="px-3 py-1.5 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
      >
        Logout
      </button>
    </header>
  );
}
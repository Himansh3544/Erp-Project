import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200 font-medium' : ''}`;

export function Sidebar() {
  return (
    <aside className="h-screen border-r bg-white p-3 space-y-1">
      <NavLink to="/" className={linkClass} end>
        Dashboard
      </NavLink>
      <NavLink to="/products" className={linkClass}>
        Products
      </NavLink>
      <NavLink to="/customers" className={linkClass}>
        Customers
      </NavLink>
      <NavLink to="/ai" className={linkClass}>
        AI Assistant
      </NavLink>
    </aside>
  );
}
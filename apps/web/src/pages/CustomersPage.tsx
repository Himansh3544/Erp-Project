import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/auth';

type Customer = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
};

export function CustomersPage() {
  const [items, setItems] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Customer>>({ name: '', email: '', phone: '', company: '' });

  async function load() {
    try {
      setLoading(true);
      const res = await apiFetch<{ items: Customer[] }>(`/api/customers`);
      setItems(res.items);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createCustomer() {
    await apiFetch(`/api/customers`, { method: 'POST', body: JSON.stringify(form) });
    setForm({ name: '', email: '', phone: '', company: '' });
    load();
  }

  async function deleteCustomer(id: string) {
    await apiFetch(`/api/customers/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Customers</h2>
      </div>

      <div className="bg-white rounded shadow p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <input className="border rounded px-2 py-1" placeholder="Name" value={form.name || ''} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="Email" value={form.email || ''} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="Phone" value={form.phone || ''} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="Company" value={form.company || ''} onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))} />
          <button className="bg-primary text-white rounded px-3 py-2" onClick={createCustomer}>Add</button>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Company</th>
              <th className="p-2 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-2" colSpan={5}>Loading…</td></tr>
            ) : error ? (
              <tr><td className="p-2 text-red-600" colSpan={5}>{error}</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="p-2" colSpan={5}>No customers</td></tr>
            ) : (
              items.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.email}</td>
                  <td className="p-2">{c.phone}</td>
                  <td className="p-2">{c.company}</td>
                  <td className="p-2">
                    <button className="text-red-600" onClick={() => deleteCustomer(c._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/auth';

type Product = {
  _id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  description?: string;
};

export function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Product>>({ name: '', sku: '', price: 0, stock: 0, description: '' });

  async function load() {
    try {
      setLoading(true);
      const res = await apiFetch<{ items: Product[] }>(`/api/products`);
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

  async function createProduct() {
    await apiFetch(`/api/products`, { method: 'POST', body: JSON.stringify(form) });
    setForm({ name: '', sku: '', price: 0, stock: 0, description: '' });
    load();
  }

  async function deleteProduct(id: string) {
    await apiFetch(`/api/products/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Products</h2>
      </div>

      <div className="bg-white rounded shadow p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <input className="border rounded px-2 py-1" placeholder="Name" value={form.name || ''} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="SKU" value={form.sku || ''} onChange={(e) => setForm((s) => ({ ...s, sku: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="Price" type="number" value={form.price || 0} onChange={(e) => setForm((s) => ({ ...s, price: Number(e.target.value) }))} />
          <input className="border rounded px-2 py-1" placeholder="Stock" type="number" value={form.stock || 0} onChange={(e) => setForm((s) => ({ ...s, stock: Number(e.target.value) }))} />
          <button className="bg-primary text-white rounded px-3 py-2" onClick={createProduct}>Add</button>
        </div>
        <textarea className="border rounded w-full px-2 py-1" placeholder="Description" value={form.description || ''} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} />
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">SKU</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-2" colSpan={5}>Loading…</td></tr>
            ) : error ? (
              <tr><td className="p-2 text-red-600" colSpan={5}>{error}</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="p-2" colSpan={5}>No products</td></tr>
            ) : (
              items.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.sku}</td>
                  <td className="p-2">${p.price.toFixed(2)}</td>
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2">
                    <button className="text-red-600" onClick={() => deleteProduct(p._id)}>Delete</button>
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
export function DashboardPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-gray-500 text-sm">Sales</div>
          <div className="text-3xl font-bold">$42,380</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-gray-500 text-sm">Active Customers</div>
          <div className="text-3xl font-bold">1,204</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-gray-500 text-sm">Low Stock</div>
          <div className="text-3xl font-bold">7</div>
        </div>
      </div>
    </div>
  );
}
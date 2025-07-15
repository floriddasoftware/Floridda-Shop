"use client";
import AdminLayout from "@/components/AdminLayout";

export default function ClientAdminDashboard({ initialStats }) {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">
              Total Products
            </h2>
            <p className="text-3xl font-bold text-blue-500">
              {initialStats.products}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">
              Total Orders
            </h2>
            <p className="text-3xl font-bold text-blue-500">
              {initialStats.orders}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
            <p className="text-3xl font-bold text-blue-500">
              {initialStats.users}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">
              Total Revenue
            </h2>
            <p className="text-3xl font-bold text-green-500">
              ₦{initialStats.revenue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
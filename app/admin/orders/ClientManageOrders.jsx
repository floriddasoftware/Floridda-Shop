"use client";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "react-toastify";
import { getAuthToken } from "@/utils/auth";

export default function ClientManageOrders({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [error, setError] = useState("");

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated!");
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      toast.error("Error updating order status.");
      setError("Failed to update order status.");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4">Order ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-4">{order._id}</td>
                  <td className="p-4">{order.user?.username || "Unknown"}</td>
                  <td className="p-4">₦{order.total.toFixed(2)}</td>
                  <td className="p-4">{order.status}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
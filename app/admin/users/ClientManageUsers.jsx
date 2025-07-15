"use client";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { getAuthToken } from "@/utils/auth";
import { toast } from "react-toastify";

export default function ClientManageUsers({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteUser = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/admin/users/${userToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setUsers(users.filter((u) => u._id !== userToDelete));
        toast.success("User deleted successfully!");
      } else {
        toast.error("Failed to delete user");
        setError("Failed to delete user");
      }
    } catch (error) {
      toast.error("Error deleting user");
      setError("Error deleting user");
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-gray-600">No users found.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.isAdmin ? "Admin" : "User"}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-text mb-4">
              Confirm Deletion
            </h3>
            <p className="text-text mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={confirmDeleteUser}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-300 text-text py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
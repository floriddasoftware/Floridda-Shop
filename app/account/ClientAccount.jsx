"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { toast } from "react-toastify";
import { getAuthToken, clearAuthToken } from "@/utils/auth";

export default function ClientAccount({ initialUser, initialOrders }) {
  const router = useRouter();
  const [user, setUser] = useState({
    name: initialUser.username,
    email: initialUser.email,
    phone: initialUser.phone,
    isAdmin: initialUser.isAdmin,
  });
  const [orders, setOrders] = useState(initialOrders);
  const [addresses, setAddresses] = useState(initialUser.addresses);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [editUsername, setEditUsername] = useState(initialUser.username);
  const [editEmail, setEditEmail] = useState(initialUser.email);
  const [editPhone, setEditPhone] = useState(initialUser.phone);
  const [editPassword, setEditPassword] = useState("");
  const [newAddress, setNewAddress] = useState({
    type: "billing",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    if (!editUsername || !editEmail || !editPhone) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    setShowUpdateModal(true);
  };

  const confirmUpdateAccount = async () => {
    setIsLoading(true);
    setError("");
    const token = getAuthToken();

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: editUsername,
          email: editEmail,
          phone: editPhone,
          password: editPassword || undefined,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser({
          name: updatedUser.username,
          email: updatedUser.email,
          phone: updatedUser.phone,
          isAdmin: user.isAdmin,
        });
        toast.success("Account updated successfully!");
      } else {
        const { message } = await response.json();
        setError(message);
        toast.error(message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("Update failed. Please try again.");
    } finally {
      setIsLoading(false);
      setShowUpdateModal(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    const token = getAuthToken();
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        clearAuthToken();
        toast.success("Account deleted successfully!");
        router.push("/login");
      } else {
        const { message } = await response.json();
        setError(message);
        toast.error(message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("Deletion failed. Please try again.");
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch("/api/user/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAddress),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setAddresses(updatedUser.addresses);
        setNewAddress({
          type: "billing",
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        });
        toast.success("Address added successfully!");
      } else {
        const { message } = await response.json();
        toast.error(message);
      }
    } catch (error) {
      toast.error("Error adding address.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-grow">
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg">
                <p className="text-text">Loading...</p>
              </div>
            </div>
          )}
          <section className="bg-gradient-to-r from-primary to-secondary py-24">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl font-bold text-white">My Account</h1>
              <p className="text-text mt-2">
                Manage your orders and account details
              </p>
            </div>
          </section>

          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 border-b mb-8">
                {["Dashboard", "Orders", "Addresses", "Profile Settings"].map(
                  (tab) => (
                    <button
                      key={tab}
                      className={`pb-2 px-4 font-medium ${
                        activeTab === tab
                          ? "text-secondary border-b-2 border-secondary"
                          : "text-text hover:text-secondary"
                      }`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              {activeTab === "Dashboard" && (
                <div>
                  <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-xl font-bold text-text mb-4">
                      Account Details
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-text">Name:</span>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-text">Email:</span>
                        <span className="font-medium">{user.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text">Phone:</span>
                        <span className="font-medium">{user.phone}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleTabClick("Profile Settings")}
                      className="mt-6 w-full bg-secondary text-white py-2 rounded-lg hover:bg-primary"
                    >
                      Edit Account
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-text mb-4">
                      Recent Orders
                    </h2>
                    {orders.length === 0 ? (
                      <p className="text-text text-center">No orders yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map((order) => (
                          <div
                            key={order._id}
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">
                                Order #{order._id}
                              </span>
                              <span className="text-sm bg-accent text-white px-2 py-1 rounded-full">
                                {order.status}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-text">
                              <span>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                              <span>₦{order.total.toFixed(2)}</span>
                            </div>
                            <button
                              onClick={() => handleTabClick("Orders")}
                              className="mt-3 w-full text-center text-secondary text-sm font-medium"
                            >
                              View Order
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => handleTabClick("Orders")}
                      className="mt-6 w-full bg-secondary text-white py-2 rounded-lg hover:bg-primary"
                    >
                      View All Orders
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "Orders" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-text mb-4">Orders</h2>
                  {orders.length === 0 ? (
                    <p className="text-text">You have no orders yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">
                              Order #{order._id}
                            </span>
                            <span className="text-sm bg-accent text-white px-2 py-1 rounded-full">
                              {order.status}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-text">
                            <span>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            <span>₦{order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "Addresses" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-text mb-4">
                    Addresses
                  </h2>
                  <div className="space-y-4">
                    {addresses.length === 0 ? (
                      <p className="text-text">No addresses saved yet.</p>
                    ) : (
                      addresses.map((addr, index) => (
                        <div key={index} className="border p-4 rounded-lg">
                          <p>
                            <strong>
                              {addr.type.charAt(0).toUpperCase() +
                                addr.type.slice(1)}{" "}
                              Address:
                            </strong>
                          </p>
                          <p>
                            {addr.street}, {addr.city}, {addr.state} {addr.zip},{" "}
                            {addr.country}
                          </p>
                        </div>
                      ))
                    )}
                    <form className="space-y-4" onSubmit={handleAddAddress}>
                      <div>
                        <label className="block text-text mb-2">Type</label>
                        <select
                          value={newAddress.type}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              type: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          <option value="billing">Billing</option>
                          <option value="shipping">Shipping</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-text mb-2">Street *</label>
                        <input
                          type="text"
                          value={newAddress.street}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              street: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-text mb-2">City *</label>
                        <input
                          type="text"
                          value={newAddress.city}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              city: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-text mb-2">State *</label>
                        <input
                          type="text"
                          value={newAddress.state}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              state: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-text mb-2">
                          Zip Code *
                        </label>
                        <input
                          type="text"
                          value={newAddress.zip}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              zip: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-text mb-2">
                          Country *
                        </label>
                        <input
                          type="text"
                          value={newAddress.country}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              country: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? "Adding..." : "Add Address"}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === "Profile Settings" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-text mb-4">
                    Profile Settings
                  </h2>
                  <form className="space-y-6" onSubmit={handleUpdateAccount}>
                    <div>
                      <label className="block text-text mb-2">Username</label>
                      <input
                        type="text"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div>
                      <label className="block text-text mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-text mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        бренд
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-text mb-2">
                        New Password (optional)
                      </label>
                      <input
                        type="password"
                        value={editPassword}
                        onChange={(e) => setEditPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="Enter new password"
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm text-center">
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Account"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 mt-4"
                      disabled={isLoading}
                    >
                      Delete Account
                    </button>
                  </form>
                </div>
              )}
            </div>
          </section>

          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-text mb-4">
                  Confirm Deletion
                </h3>
                <p className="text-text mb-6">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Deleting..." : "Confirm"}
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 bg-gray-300 text-text py-2 rounded-lg hover:bg-gray-400"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showUpdateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-text mb-4">
                  Confirm Update
                </h3>
                <p className="text-text mb-6">
                  Are you sure you want to update your account details?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={confirmUpdateAccount}
                    disabled={isLoading}
                    className={`flex-1 py-2 rounded-lg ${
                      isLoading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-secondary text-white hover:bg-primary"
                    }`}
                  >
                    {isLoading ? "Updating..." : "Confirm"}
                  </button>
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    disabled={isLoading}
                    className="flex-1 bg-gray-300 text-text py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
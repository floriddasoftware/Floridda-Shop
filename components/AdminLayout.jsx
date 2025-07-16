"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { getAuthToken, clearAuthToken } from "@/utils/auth";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = getAuthToken();
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("/api/verify-admin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          setIsAdmin(true);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Admin access denied");
          router.push("/");
        }
      } catch (error) {
        console.error("Admin verification error:", error);
        toast.error("Connection error");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [router]);

  const handleLogout = () => {
    clearAuthToken();
    router.push("/login");
    toast.success("Logged out successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Verifying admin access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-700 mb-6">
            You don&apos;t have permission to access this page
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-900 text-white p-4 fixed top-0 left-0 right-0 z-20 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/admin" className="text-2xl font-bold">
            Admin Dashboard
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Logout
            </button>
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isSidebarOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        <aside
          className={`w-64 bg-blue-800 text-white p-4 fixed top-16 bottom-0 overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out z-10 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:w-64`}
        >
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/admin"
                  className={`block py-2 px-4 rounded ${
                    pathname === "/admin"
                      ? "bg-blue-700"
                      : "hover:bg-blue-700 transition duration-200"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/products"
                  className={`block py-2 px-4 rounded ${
                    pathname === "/admin/products"
                      ? "bg-blue-700"
                      : "hover:bg-blue-700 transition duration-200"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Manage Products
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/orders"
                  className={`block py-2 px-4 rounded ${
                    pathname === "/admin/orders"
                      ? "bg-blue-700"
                      : "hover:bg-blue-700 transition duration-200"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Manage Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className={`block py-2 px-4 rounded ${
                    pathname === "/admin/users"
                      ? "bg-blue-700"
                      : "hover:bg-blue-700 transition duration-200"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Manage Users
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main
          className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-64"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
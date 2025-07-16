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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = getAuthToken();
      if (!token) {
        router.push("/ login");
        return;
      }
      try {
        const response = await fetch("/api/verify-admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) setIsAdmin(true);
        else {
          toast.error("Admin access denied");
          router.push("/");
        }
      } catch (error) {
        toast.error("Connection error");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    verifyAdmin();
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarCollapsed(false);
      } else {
        setIsSidebarCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    router.push("/login");
    toast.success("Logged out successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Verifying...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Access Denied
          </h2>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-900 text-white p-4 fixed top-0 left-0 right-0 z-30 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/admin" className="text-xl font-bold sm:text-2xl">
            Admin Dashboard
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base"
            >
              Logout
            </button>
            <button
              className="text-white focus:outline-none lg:hidden p-2"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              <svg
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
                    isSidebarCollapsed
                      ? "M4 6h16M4 12h16M4 18h16"
                      : "M6 18L18 6M6 6l12 12"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        <aside
          className={`bg-blue-800 text-white p-4 fixed top-16 bottom-0 overflow-y-auto shadow-lg z-20
            ${isSidebarCollapsed ? "w-12" : "w-40"} lg:w-40 lg:static`}
        >
          <nav>
            <ul className="space-y-4">
              {[
                {
                  path: "/admin",
                  label: "Dashboard",
                  icon: "M3 12h18M3 6h18M3 18h18",
                },
                {
                  path: "/admin/products",
                  label: "Manage Products",
                  icon: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2",
                },
                {
                  path: "/admin/orders",
                  label: "Manage Orders",
                  icon: "M3 3h18v18H3z",
                },
                {
                  path: "/admin/users",
                  label: "Manage Users",
                  icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z",
                },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center py-2 px-2 rounded text-sm sm:text-base
                      ${
                        pathname === item.path
                          ? "bg-blue-700"
                          : "hover:bg-blue-700"
                      }`}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                    {!isSidebarCollapsed && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 p-4 sm:p-6 bg-gray-100 min-h-[calc(100vh-4rem)] overflow-y-auto
            ${isSidebarCollapsed ? "ml-12" : "ml-40"} lg:ml-40`}
        >
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
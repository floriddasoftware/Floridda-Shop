"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAdminRoute && <Header />}
      <main className={`flex-grow ${isAdminRoute ? "" : "pt-16"}`}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
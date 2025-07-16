"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import Link from "next/link";

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("authToken");
      if (!token || !orderId) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const orderData = await response.json();
          setOrder(orderData);
        } else {
          router.push("/shop");
        }
      } catch (error) {
        router.push("/shop");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, router]);

  if (loading) {
    return <p className="text-gray-600">Loading order details...</p>;
  }

  if (!order) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-16">
        <section className="py-12 bg-gradient-to-r from-blue-200 to-teal-200">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-green-100 text-green-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-6">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Thank you for your purchase. Your order has been received and is
              now being processed.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    Order Information
                  </h3>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex">
                      <span className="w-32">Order Number:</span>
                      <span className="font-medium">{order._id}</span>
                    </li>
                    <li className="flex">
                      <span className="w-32">Date:</span>
                      <span>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                    <li className="flex">
                      <span className="w-32">Total:</span>
                      <span className="font-medium">
                        ₦{order.total.toFixed(2)}
                      </span>
                    </li>
                    <li className="flex">
                      <span className="w-32">Payment Method:</span>
                      <span>Paystack</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">
                    Billing Address
                  </h3>
                  <address className="not-italic text-gray-600">
                    {order.user?.username || "Customer"}
                    <br />
                    First Gate, Dutse FCT Nigeria
                    <br />
                    {order.user?.phone || "+234 701 456 1890"}
                    <br />
                    {order.user?.email || "customer@example.com"}
                  </address>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                You will receive an order confirmation email with details of
                your order. A shipping confirmation will be sent when your order
                ships.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/account/orders"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  View Order Details
                </Link>
                <Link
                  href="/shop"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Layout>
      <Suspense fallback={<p className="text-gray-600">Loading...</p>}>
        <ConfirmationContent />
      </Suspense>
    </Layout>
  );
}
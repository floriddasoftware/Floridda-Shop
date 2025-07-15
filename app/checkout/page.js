"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import PaystackButton from "@/components/PaystackButton";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, removeItem } = useCart();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 4.99;
  const total = subtotal + shipping;

  const handlePaymentSuccess = async (response) => {
    const token = getAuthToken(); 
    if (!token) {
      alert("Please log in to complete your purchase.");
      router.push("/login");
      return;
    }

    try {
      // Check stock before proceeding
      for (const item of cartItems) {
        const productRes = await fetch(`/api/products/${item.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const product = await productRes.json();
        if (product.stock < item.quantity) {
          alert(
            `Sorry, only ${product.stock} units of ${product.name} are available.`
          );
          return;
        }
      }

      // Place the order
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            product: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          total,
          paymentReference: response.reference,
        }),
      });

      if (res.ok) {
        const { orderId } = await res.json();

        // Update stock after order
        for (const item of cartItems) {
          await fetch(`/api/products/${item.id}/stock`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity: item.quantity }),
          });
        }

        cartItems.forEach((item) => removeItem(item.id));
        router.push(`/confirmation?orderId=${orderId}`);
      } else {
        alert("Failed to save order.");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("An error occurred during payment processing.");
    }
  };

  const handlePaymentClose = () => {
    console.log("Payment window closed");
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-grow pt-16">
          <section className="py-6 bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <nav className="flex space-x-2 text-sm">
                <a href="/" className="text-text">
                  Home
                </a>
                <span className="text-gray-300">/</span>
                <a href="/cart" className="text-text">
                  Cart
                </a>
                <span className="text-gray-300">/</span>
                <span className="text-secondary font-medium">Checkout</span>
              </nav>
              <h1 className="text-2xl font-bold text-text mt-4">Checkout</h1>
            </div>
          </section>

          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3 lg:pr-8">
                  <div className="bg-white rounded-xl shadow-md p-6 mb- personally6">
                    <h2 className="text-xl font-bold text-text mb-4">
                      Billing Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-text mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-text mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-text mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3 mt-8 lg:mt-0">
                  <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                    <h2 className="text-xl font-bold text-text mb-4">
                      Your Order
                    </h2>
                    <div className="border-b pb-4 mb-4">
                      <div className="flex justify-between font-medium mb-2 text-text">
                        <span>Product</span>
                        <span>Subtotal</span>
                      </div>
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm text-text"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>
                            ₦{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-b pb-4 mb-4 space-y-2">
                      <div className="flex justify-between text-text">
                        <span>Subtotal</span>
                        <span>₦{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-text">
                        <span>Shipping</span>
                        <span>₦{shipping.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg mb-6 text-text">
                      <span>Total</span>
                      <span>₦{total.toFixed(2)}</span>
                    </div>
                    <PaystackButton
                      amount={total}
                      email={email}
                      onSuccess={handlePaymentSuccess}
                      onClose={handlePaymentClose}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
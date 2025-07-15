"use client";
import Layout from "@/components/Layout";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 0.0;
  const total = subtotal + shipping;

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    router.push("/checkout");
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
                <a href="/shop" className="text-text">
                  Shop
                </a>
                <span className="text-gray-300">/</span>
                <span className="text-secondary font-medium">Cart</span>
              </nav>
              <h1 className="text-2xl font-bold text-text mt-4">Your Cart</h1>
            </div>
          </section>

          <section className="py-8">
            <div className="container mx-auto px-4">
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-text mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h2 className="text-xl font-medium text-text mt-4">
                    Your cart is empty
                  </h2>
                  <p className="text-text mt-2">
                    Looks like you haven't added anything to your cart yet
                  </p>
                  <a
                    href="/shop"
                    className="mt-6 inline-block bg-secondary text-white px-6 py-3 rounded-lg hover:bg-primary"
                  >
                    Continue Shopping
                  </a>
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {cartItems.map((item) => (
                      <div key={item.id} className="border-b last:border-0">
                        <div className="p-4 flex flex-col sm:flex-row">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl mb-4 sm:mb-0 sm:mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-text">
                                {item.name}
                              </h3>
                              <button
                                className="text-text hover:text-red-500"
                                onClick={() => removeItem(item.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="mt-1 text-sm text-text">
                              <span>Color: {item.color}</span>
                              <span className="mx-2">|</span>
                              <span>Storage: {item.storage}</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <button
                                  className="w-8 h-8 bg-background rounded-l flex items-center justify-center"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item.id,
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                  className="w-12 h-8 border-y border-gray-300 text-center"
                                />
                                <button
                                  className="w-8 h-8 bg-background rounded-r flex items-center justify-center"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <div className="font-medium">
                                ₦{(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                    <h2 className="text-xl font-bold text-text mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text">Subtotal</span>
                        <span className="font-medium">
                          ₦{subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text">Shipping</span>
                        <span className="font-medium">
                          ₦{shipping.toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t pt-3 mt-3 flex justify-between">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg">
                          ₦{total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={proceedToCheckout}
                      className="mt-6 w-full bg-secondary text-white py-3 rounded-lg hover:bg-primary"
                    >
                      Proceed to Checkout
                    </button>
                    <div className="mt-4 flex justify-center">
                      <a
                        href="/shop"
                        className="text-secondary font-medium hover:underline"
                      >
                        Continue Shopping
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
import Layout from "@/components/Layout";

export default function CheckoutPage() {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-16">
        <section className="py-6 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-2 text-sm">
              <a href="/" className="text-gray-500">Home</a>
              <span className="text-gray-300">/</span>
              <a href="/cart" className="text-gray-500">Cart</a>
              <span className="text-gray-300">/</span>
              <span className="text-red-500 font-medium">Checkout</span>
            </nav>
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Checkout</h1>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 lg:pr-8">
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Billing Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">First Name *</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Last Name *</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Company Name (Optional)</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Country / Region *</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Street Address *</label>
                      <input 
                        type="text" 
                        placeholder="House number and street name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-2" 
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Town / City *</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">County *</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Postcode *</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Phone *</label>
                      <input 
                        type="tel" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Information</h2>
                  <label className="block text-gray-700 mb-2">Order Notes (Optional)</label>
                  <textarea 
                    rows="4" 
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                  ></textarea>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3 mt-8 lg:mt-0">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Your Order</h2>
                  
                  <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between font-medium mb-2">
                      <span>Product</span>
                      <span>Subtotal</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Custom Printed Coffee Mug × 2</span>
                        <span>£30.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Printed Green T-Shirt × 1</span>
                        <span>£24.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b pb-4 mb-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>£54.00</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>£4.99</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg mb-6">
                    <span>Total</span>
                    <span>£58.99</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        id="cod" 
                        name="payment" 
                        className="mt-1"
                        defaultChecked
                      />
                      <label htmlFor="cod" className="ml-2">
                        <span className="font-medium">Cash on Delivery</span>
                        <p className="text-sm text-gray-600 mt-1">Pay with cash upon delivery</p>
                      </label>
                    </div>
                    
                    <div className="flex items-start mt-4">
                      <input 
                        type="radio" 
                        id="paypal" 
                        name="payment" 
                        className="mt-1"
                      />
                      <label htmlFor="paypal" className="ml-2">
                        <span className="font-medium">PayPal</span>
                        <p className="text-sm text-gray-600 mt-1">Pay with your PayPal account</p>
                      </label>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-6">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                  </div>
                  
                  <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600">
                    Place Order
                  </button>
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
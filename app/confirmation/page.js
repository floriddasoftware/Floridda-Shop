import Layout from '@/components/Layout';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-16">
        <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-green-100 text-green-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-6">Order Confirmed!</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Thank you for your purchase. Your order has been received and is now being processed.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Order Information</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex">
                      <span className="w-32">Order Number:</span>
                      <span className="font-medium">#10025</span>
                    </li>
                    <li className="flex">
                      <span className="w-32">Date:</span>
                      <span>July 24, 2025</span>
                    </li>
                    <li className="flex">
                      <span className="w-32">Total:</span>
                      <span className="font-medium">£58.99</span>
                    </li>
                    <li className="flex">
                      <span className="w-32">Payment Method:</span>
                      <span>Cash on Delivery</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Billing Address</h3>
                  <address className="not-italic text-gray-600">
                    John Doe<br />
                    123 Main Street<br />
                    London, SW1A 1AA<br />
                    United Kingdom<br />
                    (123) 456-7890<br />
                    john.doe@example.com
                  </address>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="hidden md:grid grid-cols-12 bg-gray-50 px-4 py-2 font-medium text-sm">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-4 text-right">Price</div>
                </div>
                
                <div className="divide-y">
                  <div className="p-4 grid grid-cols-1 md:grid-cols-12">
                    <div className="col-span-6 flex items-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                      <div>
                        <div className="font-medium">Custom Printed Coffee Mug</div>
                        <div className="text-sm text-gray-600">White / 11oz</div>
                      </div>
                    </div>
                    <div className="col-span-2 mt-2 md:mt-0 text-center">2</div>
                    <div className="col-span-4 mt-2 md:mt-0 text-right font-medium">£30.00</div>
                  </div>
                  
                  <div className="p-4 grid grid-cols-1 md:grid-cols-12">
                    <div className="col-span-6 flex items-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                      <div>
                        <div className="font-medium">Printed Green T-Shirt</div>
                        <div className="text-sm text-gray-600">Green / Medium</div>
                      </div>
                    </div>
                    <div className="col-span-2 mt-2 md:mt-0 text-center">1</div>
                    <div className="col-span-4 mt-2 md:mt-0 text-right font-medium">£24.00</div>
                  </div>
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>£54.00</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Shipping:</span>
                    <span>£4.99</span>
                  </div>
                  <div className="flex justify-between mt-2 font-bold">
                    <span>Total:</span>
                    <span>£58.99</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                You will receive an order confirmation email with details of your order. 
                A shipping confirmation will be sent when your order ships.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/account/orders" className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
                  View Order Details
                </Link>
                <Link href="/shop" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </Layout>
  );
}
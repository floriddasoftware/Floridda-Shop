import Layout from '@/components/Layout';

export default function AccountPage() {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-16">
        <section className="bg-gradient-to-r from-red-50 to-orange-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
            <p className="text-gray-600 mt-2">Manage your orders and account details</p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-4 border-b">
              <button className="pb-2 px-4 font-medium text-red-500 border-b-2 border-red-500">
                Dashboard
              </button>
              <button className="pb-2 px-4 font-medium text-gray-500 hover:text-red-500">
                Orders
              </button>
              <button className="pb-2 px-4 font-medium text-gray-500 hover:text-red-500">
                Addresses
              </button>
              <button className="pb-2 px-4 font-medium text-gray-500 hover:text-red-500">
                Account
              </button>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Account Details</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">John Doe</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">john.doe@example.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">(123) 456-7890</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
                Edit Account
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Order #100{order}</span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Jul 12, 2025</span>
                      <span>£{order === 1 ? '45.00' : order === 2 ? '28.00' : '62.00'}</span>
                    </div>
                    <button className="mt-3 w-full text-center text-red-500 text-sm font-medium">
                      View Order
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                View All Orders
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
    </Layout>
  );
}
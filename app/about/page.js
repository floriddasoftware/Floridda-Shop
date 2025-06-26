import Layout from "@/components/Layout";

export default function AboutPage() {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-16">
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">About TechGadgets</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Learn more about our journey and commitment to providing authentic smartphones
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80" />
              </div>
              
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Trusted Phone Retailer</h2>
                <p className="text-gray-600 mb-6">
                  Founded in 2018, TechGadgets has grown from a small local shop to a leading online retailer of authentic iPhones and Samsung smartphones.
                </p>
                <p className="text-gray-600 mb-6">
                  Our mission is to provide genuine products with warranty, competitive prices, and exceptional customer service.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {['Authentic Products', 'Free Shipping', '1-Year Warranty', 'Secure Payments'].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-12">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Alex Johnson', role: 'Tech Specialist' },
                { name: 'Taylor Smith', role: 'Customer Support' },
                { name: 'Morgan Lee', role: 'Sales Manager' }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gray-200 border-2 border-dashed w-full h-64" />
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-gray-600 mt-1">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-500 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '25,000+', label: 'Phones Sold' },
                { value: '99%', label: 'Happy Customers' },
                { value: '24/7', label: 'Support' },
                { value: '48h', label: 'Avg. Delivery' }
              ].map((stat, index) => (
                <div key={index} className="p-4">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
    </Layout>
  );
}
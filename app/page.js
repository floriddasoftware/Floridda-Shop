import Layout from '@/components/Layout';
import Link from 'next/link';

const products = [
  { id: 1, name: 'iPhone 15 Pro', price: '£999', image: '/iphone.jpg', category: 'iPhone' },
  { id: 2, name: 'Samsung Galaxy S24', price: '£899', image: '/samsung.jpg', category: 'Samsung' },
  { id: 3, name: 'iPhone 14', price: '£799', image: '/iphone14.jpg', category: 'iPhone' },
];

export default function HomePage() {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-16">
        <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Premium Phones at Unbeatable Prices</h1>
              <p className="text-lg text-blue-500 mt-2">Latest iPhones & Samsung Galaxies</p>
              <p className="text-gray-600 mt-4 max-w-md mx-auto md:mx-0">
                Get the latest smartphones with warranty, free shipping, and exclusive deals.
              </p>
              <Link href="/shop" className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                Shop Now
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-80" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                  <div className="p-4">
                    <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">{product.category}</span>
                    <h3 className="text-lg font-semibold text-gray-800 mt-2">{product.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-blue-500 font-bold">{product.price}</p>
                      <Link href={`/shop/${product.id}`} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/shop" className="inline-block border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-blue-500 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Limited Time Offer!</h2>
            <p className="max-w-2xl mx-auto mb-6">Get 10% off on all Samsung phones. Use Code: <span className="font-bold">SAMSUNG10</span></p>
            <Link href="/shop" className="inline-block bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
              Shop Now
            </Link>
          </div>
        </section>
      </main>
    </div>
    </Layout>
  );
}
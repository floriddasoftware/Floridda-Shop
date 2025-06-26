import Link from "next/link";
import Layout from "@/components/Layout";

const products = [
  { id: 1, name: 'iPhone 15 Pro', price: '£999', image: 'https://via.placeholder.com/300x200', category: 'iPhone', storage: '256GB', color: 'Space Black', sale: true, originalPrice: '£1099' },
  { id: 2, name: 'Samsung Galaxy S24', price: '£899', image: 'https://via.placeholder.com/300x200', category: 'Samsung', storage: '256GB', color: 'Phantom Black' },
  { id: 3, name: 'iPhone 14', price: '£799', image: 'https://via.placeholder.com/300x200', category: 'iPhone', storage: '128GB', color: 'Midnight', sale: true, originalPrice: '£899' },
  { id: 4, name: 'Samsung Galaxy Z Flip5', price: '£999', image: 'https://via.placeholder.com/300x200', category: 'Samsung', storage: '512GB', color: 'Lavender' },
  { id: 5, name: 'iPhone 13', price: '£699', image: 'https://via.placeholder.com/300x200', category: 'iPhone', storage: '128GB', color: 'Starlight' },
  { id: 6, name: 'Samsung Galaxy A54', price: '£449', image: 'https://via.placeholder.com/300x200', category: 'Samsung', storage: '128GB', color: 'Awesome Black', sale: true, originalPrice: '£499' },
];

export default function ShopPage() {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col bg-gray-50">``
      <main className="flex-grow pt-16">``
        <section className="py-6 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-2 text-sm">
              <a href="/" className="text-gray-500">Home</a>
              <span className="text-gray-300">/</span>
              <span className="text-blue-500 font-medium">Shop</span>
            </nav>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-8 md:mb-0">
                <div className="bg-white rounded-lg shadow p-4 sticky top-24">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Filter by Brand</h2>
                  
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex justify-between text-gray-600 hover:text-blue-500">
                        <span>iPhone</span>
                        <span>(3)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex justify-between text-gray-600 hover:text-blue-500">
                        <span>Samsung</span>
                        <span>(3)</span>
                      </a>
                    </li>
                  </ul>

                  <h2 className="text-lg font-bold text-gray-800 mt-8 mb-4">Storage Capacity</h2>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="flex justify-between text-gray-600 hover:text-blue-500">
                        <span>128GB</span>
                        <span>(2)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex justify-between text-gray-600 hover:text-blue-500">
                        <span>256GB</span>
                        <span>(3)</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex justify-between text-gray-600 hover:text-blue-500">
                        <span>512GB</span>
                        <span>(1)</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:w-3/4 md:pl-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Smartphone Collection</h1>
                  <div className="text-gray-600 text-sm">Showing 1-{products.length} of {products.length} results</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow overflow-hidden">
                      <div className="relative">
                        <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                        {product.sale && (
                          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Sale
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">{product.category}</span>
                        <h3 className="text-lg font-medium text-gray-800 mt-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{product.storage} • {product.color}</p>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <span className="text-blue-500 font-bold">{product.price}</span>
                            {product.sale && (
                              <span className="text-gray-400 text-sm line-through ml-2">{product.originalPrice}</span>
                            )}
                          </div>
                          <Link href={`/shop/${product.id}`} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button className="bg-blue-500 text-white w-10 h-10 rounded-full mr-2">1</button>
                  <button className="bg-gray-200 text-gray-700 w-10 h-10 rounded-full hover:bg-gray-300">2</button>
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
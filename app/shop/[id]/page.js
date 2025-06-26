import Layout from "@/components/Layout";

export default function ProductDetailPage() {
  const product = {
    id: 1,
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 999,
    originalPrice: 1099,
    storage: '256GB',
    color: 'Space Black',
    description: 'The ultimate iPhone experience with A17 Pro chip, Pro camera system, and Ceramic Shield front cover.',
    features: [
      '6.1-inch Super Retina XDR display',
      'Pro camera system with 48MP Main camera',
      'A17 Pro chip for next-level performance',
      'All-day battery life',
      '5G connectivity'
    ],
    reviews: [
      { name: 'Sarah Johnson', date: 'July 15, 2025', rating: 5, comment: 'The camera quality is outstanding! Battery lasts all day with heavy use.' },
      { name: 'Michael Chen', date: 'July 10, 2025', rating: 4, comment: 'Love the new titanium design. Only wish the charging cable was included.' }
    ]
  };

  return (
    <Layout>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow pt-16">
        <section className="py-6 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-2 text-sm">
              <a href="/" className="text-gray-500">Home</a>
              <span className="text-gray-300">/</span>
              <a href="/shop" className="text-gray-500">Shop</a>
              <span className="text-gray-300">/</span>
              <span className="text-blue-500 font-medium">{product.name}</span>
            </nav>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 mb-4" />
                <div className="flex space-x-2">
                  {[1, 2, 3].map((thumb) => (
                    <div key={thumb} className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20" />
                  ))}
                </div>
              </div>

              <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
                <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">(24 reviews)</span>
                </div>

                <div className="mt-4">
                  <span className="text-xl font-bold text-blue-500">£{product.price}</span>
                  <span className="text-gray-400 line-through ml-2">£{product.originalPrice}</span>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded ml-2">9% OFF</span>
                </div>

                <p className="mt-4 text-gray-600">
                  {product.description}
                </p>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-800">Specifications</h3>
                  <div className="mt-2 space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Storage</label>
                      <div className="flex space-x-2">
                        {['128GB', '256GB', '512GB'].map((size) => (
                          <button 
                            key={size}
                            className={`px-4 py-2 border rounded hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${size === product.storage ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Color</label>
                      <div className="flex space-x-2">
                        {['Space Black', 'Silver', 'Gold', 'Blue'].map((color) => (
                          <button 
                            key={color}
                            className={`w-8 h-8 rounded-full border focus:ring-2 focus:ring-blue-500 ${color === product.color ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300'}`}
                            style={{ backgroundColor: color.toLowerCase().includes('black') ? '#000' : color.toLowerCase().includes('silver') ? '#c0c0c0' : color.toLowerCase().includes('gold') ? '#FFD700' : '#007AFF' }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Quantity</label>
                      <div className="flex items-center">
                        <button className="w-10 h-10 bg-gray-100 rounded-l-lg flex items-center justify-center">-</button>
                        <input 
                          type="number" 
                          min="1"
                          defaultValue="1"
                          className="w-16 h-10 border-y border-gray-300 text-center"
                        />
                        <button className="w-10 h-10 bg-gray-100 rounded-r-lg flex items-center justify-center">+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-4">
                  <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
                    Add to Cart
                  </button>
                  <button className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Details</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <ul className="space-y-2 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center mb-1">
                        <div className="w-10 text-sm">{stars} stars</div>
                        <div className="flex-1 bg-gray-200 h-2 rounded-full mx-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${stars * 20}%` }}
                          ></div>
                        </div>
                        <div className="w-10 text-right text-sm text-gray-500">24</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
                  Write a Review
                </button>

                <div className="mt-8 space-y-6">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{review.name}</h3>
                        <div className="flex text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                      <p className="mt-2 text-gray-600">
                        {review.comment}
                      </p>
                    </div>
                  ))}
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
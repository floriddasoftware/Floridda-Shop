import Layout from "@/components/Layout";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function HomePage() {
  await connectToDatabase();
  const products = await Product.find({}).limit(4).lean();

  return (
    <Layout>
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-grow">
          <section className="bg-gradient-to-r from-primary to-secondary py-12">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Premium Phones at Unbeatable Prices
                </h1>
                <p className="text-lg text-accent mt-2">
                  Latest iPhones & Samsung Galaxies
                </p>
                <p className="text-text mt-4 max-w-md mx-auto md:mx-0">
                  Get the latest smartphones with warranty, free shipping, and
                  exclusive deals.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-block bg-secondary text-white px-6 py-3 rounded-lg hover:bg-primary transition duration-300"
                >
                  Shop Now
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Carousel />
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-text text-center mb-10">
                Featured Products
              </h2>
              {products.length === 0 ? (
                <p className="text-center text-text">
                  No featured products available yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-xl shadow overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={`${product.name} - ${product.storage} ${product.color}`}
                          className="w-full h-48 object-cover"
                        />
                        {product.sale && (
                          <span className="absolute top-2 right-2 bg-secondary text-white text-xs px-2 py-1 rounded">
                            Sale
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-secondary bg-blue-50 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                        <h3 className="text-lg font-medium text-text mt-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-text mt-1">
                          {product.storage} • {product.color}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <span className="text-secondary font-bold">
                              ₦{product.price}
                            </span>
                            {product.sale && (
                              <span className="text-text text-sm line-through ml-2">
                                ₦{product.originalPrice}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/shop/${product._id}`}
                            className="bg-background text-text px-3 py-1 rounded text-sm hover:bg-gray-200"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="bg-primary text-white py-12">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Limited Time Offer!
              </h2>
              <p className="max-w-2xl mx-auto mb-6 text-background">
                Get 10% off on all Samsung phones. Use Code:{" "}
                <span className="font-bold">SAMSUNG10</span>
              </p>
              <Link
                href="/shop"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-background transition duration-300"
              >
                Shop Now
              </Link>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
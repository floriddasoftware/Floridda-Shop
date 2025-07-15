"use client";
import { useState } from "react";
import Link from "next/link";

export default function ShopClient({ products }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const brands = [...new Set(products.map((product) => product.category))];
  const storages = [...new Set(products.map((product) => product.storage))];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 mb-8 md:mb-0">
        <div className="bg-white rounded-lg shadow p-4 sticky top-24">
          <h2 className="text-lg font-bold text-text mb-4">Filter by Brand</h2>
          {brands.length === 0 ? (
            <p className="text-text">No brands available</p>
          ) : (
            <ul className="space-y-2">
              {brands.map((brand) => (
                <li key={brand}>
                  <a
                    href="#"
                    className="flex justify-between text-text hover:text-secondary"
                  >
                    <span>{brand}</span>
                    <span>
                      ({products.filter((p) => p.category === brand).length})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <h2 className="text-lg font-bold text-text mt-8 mb-4">
            Storage Capacity
          </h2>
          {storages.length === 0 ? (
            <p className="text-text">No storage options available</p>
          ) : (
            <ul className="space-y-2">
              {storages.map((storage) => (
                <li key={storage}>
                  <a
                    href="#"
                    className="flex justify-between text-text hover:text-secondary"
                  >
                    <span>{storage}</span>
                    <span>
                      ({products.filter((p) => p.storage === storage).length})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="md:w-3/4 md:pl-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-text mb-4 md:mb-0">
            Smartphone Collection
          </h1>
          <div className="text-text text-sm">
            Showing 1-{filteredProducts.length} of {products.length} results
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
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
        <div className="mt-8 flex justify-center">
          <button className="bg-secondary text-white w-10 h-10 rounded-full mr-2">
            1
          </button>
          <button className="bg-background text-text w-10 h-10 rounded-full hover:bg-gray-200">
            2
          </button>
        </div>
      </div>
    </div>
  );
}
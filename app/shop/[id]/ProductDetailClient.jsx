"use client";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { toast } from "react-toastify";
import { getAuthToken } from "@/utils/auth";

export default function ProductDetailClient({ product, reviews }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, id: product._id, quantity });
    toast.success("Added to cart!");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.error("Please provide a rating and comment.");
      return;
    }
    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        toast.error("Please log in to submit a review.");
        return;
      }
      const response = await fetch(`/api/products/${product._id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });
      if (response.ok) {
        toast.success("Review submitted successfully!");
        setRating(0);
        setComment("");
        // Note: You may want to refresh reviews here by re-fetching from the server
      } else {
        toast.error("Failed to submit review.");
      }
    } catch (error) {
      toast.error("Error submitting review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={`${product.name} - ${product.storage} ${product.color}`}
            className="w-full h-80 object-cover rounded-xl mb-4"
          />
          <div className="flex space-x-2">
            {[1, 2, 3].map((thumb) => (
              <div
                key={thumb}
                className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20"
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 text-sm ml-2">
              ({reviews.length} reviews)
            </span>
          </div>

          <div className="mt-4">
            <span className="text-xl font-bold text-blue-500">
              ₦{product.price}
            </span>
            {product.sale && (
              <>
                <span className="text-gray-400 line-through ml-2">
                  ₦{product.originalPrice}
                </span>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded ml-2">
                  9% OFF
                </span>
              </>
            )}
          </div>

          <p className="mt-4 text-gray-600">
            {product.description || "No description available."}
          </p>

          <div className="mt-6">
            <h3 className="font-medium text-gray-800">Specifications</h3>
            <div className="mt-2 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Storage</label>
                <div className="flex space-x-2">
                  {["128GB", "256GB", "512GB"].map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                        size === product.storage
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Color</label>
                <div className="flex space-x-2">
                  {["Space Black", "Silver", "Gold", "Blue"].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border focus:ring-2 focus:ring-blue-500 ${
                        color === product.color
                          ? "border-blue-500 ring-2 ring-blue-300"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase().includes("black")
                          ? "#000"
                          : color.toLowerCase().includes("silver")
                          ? "#c0c0c0"
                          : color.toLowerCase().includes("gold")
                          ? "#FFD700"
                          : "#007AFF",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-100 rounded-l-lg flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 h-10 border-y border-gray-300 text-center"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-100 rounded-r-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              Add to Cart
            </button>
            <button className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Customer Reviews
        </h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{review.user.username}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Submit a Review
          </h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Rating *</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
                disabled={loading}
              >
                <option value="0">Select rating</option>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Comment *</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="4"
                required
                disabled={loading}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg transition duration-300 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
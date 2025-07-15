import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Review from "@/models/Review";
import Layout from "@/components/Layout";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({ params }) {
  await connectToDatabase();

  const { id } = await params;

  const product = await Product.findById(id).lean();
  const reviews = await Review.find({ product: id })
    .populate("user", "username")
    .lean();

  const plainProduct = product
    ? { ...product, _id: product._id.toString() }
    : null;
  const plainReviews = reviews.map((review) => ({
    ...review,
    _id: review._id.toString(),
    product: review.product.toString(),
    user: {
      ...review.user,
      _id: review.user._id.toString(),
    },
    date: review.date.toISOString(),
  }));

  return (
    <Layout>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow pt-16">
          <section className="py-6 bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <nav className="flex space-x-2 text-sm">
                <a href="/" className="text-gray-500">
                  Home
                </a>
                <span className="text-gray-300">/</span>
                <a href="/shop" className="text-gray-500">
                  Shop
                </a>
                <span className="text-gray-300">/</span>
                <span className="text-blue-500 font-medium">
                  {plainProduct?.name || "Product"}
                </span>
              </nav>
            </div>
          </section>
          <section className="py-8">
            <div className="container mx-auto px-4">
              <ProductDetailClient
                product={plainProduct}
                reviews={plainReviews}
              />
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
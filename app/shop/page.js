import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Layout from "@/components/Layout";
import ShopClient from "./ShopClient";
import Error from "@/components/Error";

export default async function ShopPage() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).lean();
    const plainProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }));
    return (
      <Layout>
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-grow pt-16">
            <section className="py-6 bg-white shadow-sm">
              <div className="container mx-auto px-4">
                <nav className="flex space-x-2 text-sm">
                  <a href="/" className="text-text">
                    Home
                  </a>
                  <span className="text-gray-300">/</span>
                  <span className="text-secondary font-medium">Shop</span>
                </nav>
              </div>
            </section>
            <section className="py-8">
              <div className="container mx-auto px-4">
                <ShopClient products={plainProducts} />
              </div>
            </section>
          </main>
        </div>
      </Layout>
    );
  } catch (error) {
    console.error("Error loading Shop page:", error);
    return (
      <Layout>
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-grow pt-16">
            <section className="py-8">
              <div className="container mx-auto px-4">
                <Error message="We’re having trouble loading the shop. Please try again later." />
                <div className="text-center mt-6">
                  <a
                    href="/"
                    className="inline-block bg-secondary text-white px-6 py-3 rounded-lg hover:bg-primary"
                  >
                    Back to Home
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    );
  }
}
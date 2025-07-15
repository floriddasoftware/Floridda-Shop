import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import ClientManageProducts from "./ClientManageProducts";
import Error from "@/components/Error";

export default async function ManageProductsPage() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      redirect("/");
    }

    await connectToDatabase();
    const products = await Product.find().lean();

    const plainProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }));

    return <ClientManageProducts initialProducts={plainProducts} />;
  } catch (error) {
    console.error("Error fetching products:", error);
    return <Error message="Failed to load products. Please try again." />;
  }
}
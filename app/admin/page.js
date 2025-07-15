import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import ClientAdminDashboard from "./ClientAdminDashboard";
import Error from "@/components/Error";

export default async function AdminDashboardPage() {
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
    const [products, orders, users, revenue] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      Order.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
      ]),
    ]);

    const stats = {
      products,
      orders,
      users,
      revenue: revenue[0]?.totalRevenue || 0,
    };

    return <ClientAdminDashboard initialStats={stats} />;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return <Error message="Failed to load dashboard data. Please try again." />;
  }
}
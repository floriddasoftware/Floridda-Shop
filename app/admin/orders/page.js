import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import ClientManageOrders from "./ClientManageOrders";
import Error from "@/components/Error";

export default async function ManageOrdersPage({ searchParams }) {
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

    const page =
      searchParams && searchParams.page
        ? parseInt(searchParams.page, 10) || 1
        : 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const [orders, totalOrders] = await Promise.all([
      Order.find().populate("user", "username").skip(skip).limit(limit).lean(),
      Order.countDocuments(),
    ]);

    const plainOrders = orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      user: order.user
        ? { ...order.user, _id: order.user._id.toString() }
        : null,
      createdAt: order.createdAt.toISOString(),
    }));

    const totalPages = Math.ceil(totalOrders / limit);

    return (
      <ClientManageOrders
        initialOrders={plainOrders}
        currentPage={page}
        totalPages={totalPages}
      />
    );
  } catch (error) {
    console.error("Error fetching orders:", {
      message: error.message,
      stack: error.stack,
    });
    return <Error message="Failed to load orders. Please try again." />;
  }
}
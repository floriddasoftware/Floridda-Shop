import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import ClientAccount from "./ClientAccount";
import Error from "@/components/Error";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();

    const user = await User.findById(decoded.userId).select("-password").lean();
    if (!user) {
      return <Error message="User not found. Please log in again." />;
    }

    const orders = await Order.find({ user: decoded.userId }).lean();

    const plainUser = {
      ...user,
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      addresses: user.addresses || [],
    };
    const plainOrders = orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      createdAt: order.createdAt.toISOString(),
    }));

    return (
      <ClientAccount initialUser={plainUser} initialOrders={plainOrders} />
    );
  } catch (error) {
    console.error("Error fetching account data:", error);
    if (error.name === "JsonWebTokenError") {
      return (
        <Error message="Invalid authentication token. Please log in again." />
      );
    } else if (error.name === "MongoNetworkError") {
      return (
        <Error message="Database connection failed. Please try again later." />
      );
    }
    return <Error message="An unexpected error occurred. Please try again." />;
  }
}
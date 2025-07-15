import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import ClientManageUsers from "./ClientManageUsers";
import Error from "@/components/Error";

export default async function ManageUsersPage() {
  const cookieStore = cookies();
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
    const users = await User.find().select("-password").lean();

    const plainUsers = users.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }));

    return <ClientManageUsers initialUsers={plainUsers} />;
  } catch (error) {
    console.error("Error fetching users:", error);
    return <Error message="Failed to load users. Please try again." />;
  }
}
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(
        JSON.stringify({ message: "Unauthorized: No token provided" }),
        {
          status: 401,
        }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return new Response(
        JSON.stringify({ message: "Forbidden: Admin access required" }),
        {
          status: 403,
        }
      );
    }

    await connectToDatabase();
    const count = await User.countDocuments();
    return new Response(JSON.stringify({ count }), { status: 200 });
  } catch (error) {
    console.error("Error fetching user count:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch user count" }),
      { status: 500 }
    );
  }
}
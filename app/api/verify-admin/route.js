import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();

    const user = await User.findById(decoded.userId);
    if (!user || !user.isAdmin) {
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
      });
    }

    return new Response(JSON.stringify({ isAdmin: true }), { status: 200 });
  } catch (error) {
    console.error("Error verifying admin:", error);

    if (error.name === "TokenExpiredError") {
      return new Response(JSON.stringify({ message: "Token expired" }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ message: "Invalid token" }), {
      status: 401,
    });
  }
}
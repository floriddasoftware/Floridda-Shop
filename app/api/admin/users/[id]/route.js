import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function DELETE(req, { params }) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin)
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
      });

    await connectToDatabase();
    const { id } = params;
    const user = await User.findByIdAndDelete(id);
    if (!user)
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify({ message: "User deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ message: "Error deleting user" }), {
      status: 500,
    });
  }
}
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function DELETE(req, { params }) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
      });
    }

    await connectToDatabase();
    const { id } = params;

    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    if (user.email === "floriddasoftware@gmail.com") {
      return new Response(
        JSON.stringify({ message: "Cannot delete the primary admin user" }),
        { status: 403 }
      );
    }

    await User.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting user:", {
      message: error.message,
      stack: error.stack,
    });
    return new Response(JSON.stringify({ message: "Error deleting user" }), {
      status: 500,
    });
  }
}
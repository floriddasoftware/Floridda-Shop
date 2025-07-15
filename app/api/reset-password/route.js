import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, password } = await req.json();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();
    const user = await User.findById(decoded.userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    return new Response(
      JSON.stringify({ message: "Password reset successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return new Response(
      JSON.stringify({ message: "Error resetting password" }),
      {
        status: 500,
      }
    );
  }
}
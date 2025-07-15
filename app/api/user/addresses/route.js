import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();
    const { type, street, city, state, zip, country } = await req.json();
    const user = await User.findById(decoded.userId);
    if (!user)
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });

    user.addresses.push({ type, street, city, state, zip, country });
    await user.save();
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error adding address:", error);
    return new Response(JSON.stringify({ message: "Error adding address" }), {
      status: 500,
    });
  }
}
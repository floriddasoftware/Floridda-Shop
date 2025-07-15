import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    return new Response(JSON.stringify({ exists: !!user }), { status: 200 });
  } catch (error) {
    console.error("Error checking email:", error);
    return new Response(JSON.stringify({ exists: false }), { status: 500 });
  }
}
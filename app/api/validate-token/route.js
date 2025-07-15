import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { token } = await req.json();
    jwt.verify(token, process.env.JWT_SECRET);
    return new Response(JSON.stringify({ valid: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ valid: false }), { status: 400 });
  }
}
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "floriddasoftware@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "floriddasoftware@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`,
    });

    return new Response(JSON.stringify({ message: "Reset link sent" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending reset link:", error);
    return new Response(
      JSON.stringify({ message: "Error sending reset link" }),
      {
        status: 500,
      }
    );
  }
}
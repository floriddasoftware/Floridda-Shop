import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", {
      message: error.message,
      stack: error.stack,
    });
    let message = "An unexpected error occurred.";
    if (error.name === "JsonWebTokenError") {
      message = "Invalid authentication token.";
    } else if (error.name === "TokenExpiredError") {
      message = "Authentication token has expired.";
    }
    return new Response(JSON.stringify({ message }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();
    const { username, email, phone, password } = await req.json();

    if (username && username.length < 3) {
      return new Response(
        JSON.stringify({ message: "Username must be at least 3 characters" }),
        { status: 400 }
      );
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ message: "Invalid email format" }), {
        status: 400,
      });
    }
    if (phone && phone.length < 10) {
      return new Response(
        JSON.stringify({ message: "Phone number must be at least 10 digits" }),
        { status: 400 }
      );
    }
    if (password && password.length < 6) {
      return new Response(
        JSON.stringify({ message: "Password must be at least 6 characters" }),
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return new Response(
          JSON.stringify({ message: "Username already taken" }),
          { status: 400 }
        );
      }
      user.username = username;
    }
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return new Response(
          JSON.stringify({ message: "Email already in use" }),
          { status: 400 }
        );
      }
      user.email = email;
    }
    if (phone) user.phone = phone;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    const updatedUser = {
      username: user.username,
      email: user.email,
      phone: user.phone,
    };
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", {
      message: error.message,
      stack: error.stack,
    });
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();
    const user = await User.findByIdAndDelete(decoded.userId);
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Account deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting user:", {
      message: error.message,
      stack: error.stack,
    });
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import jwt from "jsonwebtoken";

export async function PUT(req, { params }) {
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
    const data = await req.json();
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!product)
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ message: "Error updating product" }), {
      status: 500,
    });
  }
}

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
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ message: "Error deleting product" }), {
      status: 500,
    });
  }
}

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const product = await Product.findById(id).lean();
    if (!product)
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    return new Response(
      JSON.stringify({ ...product, _id: product._id.toString() }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ message: "Error fetching product" }), {
      status: 500,
    });
  }
}
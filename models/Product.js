import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  storage: String,
  color: String,
  sale: Boolean,
  originalPrice: Number,
  description: String,
  stock: { type: Number, default: 0 },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
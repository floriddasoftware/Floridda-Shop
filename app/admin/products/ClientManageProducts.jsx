"use client";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { getAuthToken } from "@/utils/auth";
import { toast } from "react-toastify";

export default function ClientManageProducts({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [storage, setStorage] = useState("");
  const [color, setColor] = useState("");
  const [sale, setSale] = useState(false);
  const [originalPrice, setOriginalPrice] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setUploadError("Only JPEG/PNG images allowed");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

    try {
      setUploadError("");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (data.secure_url) {
        setImage(data.secure_url);
        setImagePreview(data.secure_url);
      } else {
        setUploadError("Image upload failed");
      }
    } catch (error) {
      setUploadError("Error uploading image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");
    setSuccess("");

    const errors = [];
    if (!name || name.length < 3)
      errors.push("Name must be at least 3 characters");
    if (!price || Number(price) <= 0) errors.push("Price must be positive");
    if (!image) errors.push("Image is required");
    if (!category) errors.push("Category is required");
    if (!storage) errors.push("Storage is required");
    if (!color) errors.push("Color is required");
    if (sale && (!originalPrice || Number(originalPrice) <= Number(price))) {
      errors.push("Original price must be higher than sale price");
    }

    if (errors.length > 0) {
      setUploadError(errors.join(". "));
      return;
    }

    try {
      setLoading(true);
      const token = getAuthToken();
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : "/api/products";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          image,
          category,
          storage,
          color,
          sale,
          originalPrice: sale ? Number(originalPrice) : null,
        }),
      });

      if (response.ok) {
        setSuccess(
          editingProduct
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        setName("");
        setPrice("");
        setImage("");
        setImagePreview("");
        setCategory("");
        setStorage("");
        setColor("");
        setSale(false);
        setOriginalPrice("");
        setEditingProduct(null);
        const updatedProducts = await fetch("/api/admin/products", {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => res.json());
        setProducts(updatedProducts);
      } else {
        const errorData = await response.json();
        setUploadError(errorData.message || "Error saving product");
      }
    } catch (error) {
      setUploadError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setImage(product.image);
    setImagePreview(product.image);
    setCategory(product.category);
    setStorage(product.storage);
    setColor(product.color);
    setSale(product.sale);
    setOriginalPrice(
      product.originalPrice ? product.originalPrice.toString() : ""
    );
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/products/${productToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setProducts(products.filter((p) => p._id !== productToDelete));
        setSuccess("Product deleted successfully!");
        toast.success("Product deleted successfully!");
      } else {
        setUploadError("Failed to delete product");
        toast.error("Failed to delete product");
      }
    } catch (error) {
      setUploadError("Error deleting product");
      toast.error("Error deleting product");
    } finally {
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h1>
        {success && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4">
            {success}
          </div>
        )}
        {uploadError && (
          <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4">
            {uploadError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text mb-2">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
              required
              disabled={loading}
              aria-label="Product Name"
            />
          </div>
          <div>
            <label className="block text-text mb-2">Price (NGN) *</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
              required
              disabled={loading}
              min="1"
              aria-label="Product Price"
            />
          </div>
          <div>
            <label className="block text-text mb-2">Image *</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full p-3"
              required={!editingProduct}
              disabled={loading}
              accept="image/jpeg,image/png"
              aria-label="Product Image Upload"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Uploaded product preview"
                className="mt-4 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>
          <div>
            <label className="block text-text mb-2">Category *</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
              required
              disabled={loading}
              aria-label="Product Category"
            />
          </div>
          <div>
            <label className="block text-text mb-2">Storage *</label>
            <input
              type="text"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
              required
              disabled={loading}
              aria-label="Product Storage"
            />
          </div>
          <div>
            <label className="block text-text mb-2">Color *</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
              required
              disabled={loading}
              aria-label="Product Color"
            />
          </div>
          <div>
            <label className="block text-text mb-2">On Sale</label>
            <input
              type="checkbox"
              checked={sale}
              onChange={(e) => setSale(e.target.checked)}
              className="mr-2"
              disabled={loading}
              aria-label="On Sale Checkbox"
            />
            {sale && (
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                placeholder="Original Price (NGN)"
                disabled={loading}
                min={Number(price) + 1}
                aria-label="Original Price"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loading
              ? "Saving..."
              : editingProduct
              ? "Update Product"
              : "Add Product"}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="w-full py-3 mt-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Product List</h1>
        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Category</th>
                <th className="p-4">Storage</th>
                <th className="p-4">Color</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">₦{product.price.toFixed(2)}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.storage}</td>
                  <td className="p-4">{product.color}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-text mb-4">
              Confirm Deletion
            </h3>
            <p className="text-text mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-300 text-text py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
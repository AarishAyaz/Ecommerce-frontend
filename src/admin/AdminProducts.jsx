import { useEffect, useState } from "react";
import axios from "../axios";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {loading ? (
        <p className="text-gray-400">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400">No products found. Add some products to get started.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Category</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-slate-900 divide-y divide-slate-700">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-4 text-sm">{p.name}</td>
                  <td className="px-6 py-4 text-sm">${p.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">{p.category?.name || "Uncategorized"}</td>
                  <td className="px-6 py-4 text-sm text-right flex justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admin/products/view/${p._id}`)}
                      className="flex items-center gap-1 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                      className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded transition"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-500 rounded transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import { Eye, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const CategoryProducts = () => {
  const { id } = useParams(); // category ID
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);

        // Fetch category name
        const catRes = await axios.get(`/api/categories/${id}`);
        setCategoryName(catRes.data.name);

        // Fetch products filtered by category
        const { data } = await axios.get(`/api/products?category=${id}`);
        setProducts(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [id]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`/api/products/${productId}`);
      toast.success("Product deleted");
      setProducts(products.filter((p) => p._id !== productId));
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="p-6 text-gray-400">Loading...</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Products in "{categoryName}"
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-400">No products found in this category.</p>
      ) : (
        <table className="w-full bg-slate-900 border border-slate-700 rounded-lg">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="p-4">Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t border-slate-700">
                <td className="p-4">{p.name}</td>
                <td>${p.price}</td>
                <td className="p-4 flex justify-end gap-3">
                  <Eye onClick={() => navigate(`/products/${p._id}`)} />
                  <Edit
                    onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                  />
                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(p._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryProducts;

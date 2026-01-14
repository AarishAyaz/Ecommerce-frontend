import { useEffect, useState } from "react";
import axios from "../axios";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(`/api/products/${id}`);
    toast.success("Product deleted");
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <table className="w-full bg-slate-900 border border-slate-700 rounded-lg">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="p-4">Name</th>
            <th>Price</th>
            <th>Category</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t border-slate-700">
              <td className="p-4">{p.name}</td>
              <td>${p.price}</td>
              <td>{p.category?.name}</td>
              <td className="p-4 flex justify-end gap-3">
                <Eye onClick={() => navigate(`/products/${p._id}`)} />
                <Edit onClick={() => navigate(`/admin/products/edit/${p._id}`)} />
                <Trash2
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(p._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;

import { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchCategories,
  deleteCategory
} from "../api/categoryApi";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const loadCategories = async () => {
    try {
      const { data } = await fetchCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);
      toast.success("Category deleted");
      loadCategories();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => navigate("/admin/categories/add")}
          className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <table className="w-full bg-slate-900 border border-slate-700 rounded-lg">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="p-4">Name</th>
            <th className="text-right p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 && (
            <tr>
              <td colSpan="2" className="p-6 text-center text-gray-400">
                No categories found
              </td>
            </tr>
          )}

          {categories.map((c) => (
            <tr key={c._id} className="border-t border-slate-700">
              <td className="p-4 cursor-pointer hover:text-indigo-400"   onClick={() => navigate(`/admin/categories/${c._id}/products`)}>{c.name}</td>
              <td className="p-4 flex justify-end gap-4">
                <Edit
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/categories/edit/${c._id}`)
                  }
                />
                <Trash2
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDelete(c._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategories;

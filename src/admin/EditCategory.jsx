import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchCategoryById,
  updateCategory
} from "../api/categoryApi";

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchCategoryById(id);
        setName(data.name);
      } catch {
        toast.error("Failed to load category");
      }
    };
    load();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateCategory(id, { name });
      toast.success("Category updated");
      navigate("/admin/categories");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-8 max-w-md text-white">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          className="w-full p-3 bg-slate-800 border border-slate-700 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 py-3 rounded font-semibold"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCategory;

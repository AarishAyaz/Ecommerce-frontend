import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createCategory } from "../api/categoryApi.js";

const AddCategory = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name is required");

    try {
      // No need to manually pass headers; interceptor handles it
      await createCategory({ name });
      toast.success("Category created");
      navigate("/admin/categories");
    } catch (error) {
      console.error(error.response?.data);
      toast.error(error.response?.data?.message || "Creation failed");
    }
  };

  return (
    <div className="p-8 max-w-md text-white">
      <h1 className="text-2xl font-bold mb-6">Add Category</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          placeholder="Category name"
          className="w-full p-3 bg-slate-800 border border-slate-700 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 py-3 rounded font-semibold"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddCategory;

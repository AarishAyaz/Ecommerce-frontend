import { useState, useEffect } from "react";
import axios from "../axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("/api/categories");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/products", form);
    toast.success("Product created");
    navigate("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 text-white max-w-xl space-y-4">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <input
        placeholder="Product Name"
        className="w-full p-2 bg-slate-800"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <textarea
        placeholder="Description"
        className="w-full p-2 bg-slate-800"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="number"
        placeholder="Price"
        className="w-full p-2 bg-slate-800"
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        required
      />

      <select
        className="w-full p-2 bg-slate-800"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Brand"
        className="w-full p-2 bg-slate-800"
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
      />

      <input
        placeholder="Image URL"
        className="w-full p-2 bg-slate-800"
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <input
        type="number"
        placeholder="Stock Count"
        className="w-full p-2 bg-slate-800"
        onChange={(e) => setForm({ ...form, countInStock: Number(e.target.value) })}
      />

      <button className="bg-indigo-600 px-6 py-2 rounded">Create</button>
    </form>
  );
};

export default AddProduct;

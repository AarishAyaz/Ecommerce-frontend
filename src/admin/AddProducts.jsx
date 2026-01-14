import { useState } from "react";
import axios from "../axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/products", form);
    toast.success("Product created");
    navigate("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 text-white max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <input
        placeholder="Product Name"
        className="w-full mb-4 p-2 bg-slate-800"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Price"
        type="number"
        className="w-full mb-4 p-2 bg-slate-800"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button className="bg-indigo-600 px-6 py-2 rounded">
        Create
      </button>
    </form>
  );
};

export default AddProduct;

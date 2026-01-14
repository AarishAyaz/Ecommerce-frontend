import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import toast from "react-hot-toast";
import { ArrowLeft, Save } from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: ""
  });

  /* ======================
     FETCH PRODUCT
  ====================== */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setFormData({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
          category: data.category?._id || data.category || ""
        });
      } catch (error) {
        toast.error("Failed to load product",error);
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  /* ======================
     HANDLERS
  ====================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      return toast.error("Name and price are required");
    }

    try {
      setLoading(true);
      await axios.put(`/api/products/${id}`, formData);
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update product"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     UI
  ====================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6">
      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Edit Product</h1>
          <button
            onClick={() => navigate("/admin/products")}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg
                         px-4 py-2.5 text-white focus:outline-none
                         focus:border-indigo-500"
              placeholder="Product name"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg
                         px-4 py-2.5 text-white focus:outline-none
                         focus:border-indigo-500"
              placeholder="Product price"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg
                         px-4 py-2.5 text-white focus:outline-none
                         focus:border-indigo-500"
              placeholder="Product description"
            />
          </div>

          {/* Category (ID for now) */}
          <div>
            <label className="text-sm text-gray-300 block mb-1">
              Category ID
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg
                         px-4 py-2.5 text-white focus:outline-none
                         focus:border-indigo-500"
              placeholder="Category ID"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-2 rounded-lg bg-slate-700 text-white
                         hover:bg-slate-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 rounded-lg
                         bg-indigo-600 hover:bg-indigo-700 text-white
                         font-semibold transition disabled:bg-slate-600"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;

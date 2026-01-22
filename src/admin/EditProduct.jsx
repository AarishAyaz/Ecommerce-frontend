import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import toast from "react-hot-toast";
import { 
  ArrowLeft, 
  Save, 
  Package, 
  DollarSign, 
  Layers,
  Tag,
  FileText,
  Image as ImageIcon,
  Box
} from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    image: "",
    countInStock: ""
  });

  /* Fetch Product & Categories */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch product
        const { data: product } = await axios.get(`/api/products/${id}`);
        setFormData({
          name: product.name || "",
          price: product.price || "",
          description: product.description || "",
          category: product.category?._id || product.category || "",
          brand: product.brand || "",
          image: product.image || "",
          countInStock: product.countInStock || ""
        });

        // Fetch categories
        const { data: cats } = await axios.get("/api/categories");
        setCategories(cats);
      } catch (error) {
        toast.error("Failed to load product", error);
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      return toast.error("Name and price are required");
    }

    try {
      setSubmitting(true);
      await axios.put(`/api/products/${id}`, {
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock)
      });
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/products");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-white 
                   mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-medium">Back to Products</span>
        </button>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl 
                      border border-slate-700 shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 
                        px-6 sm:px-8 py-8 sm:py-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10 flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md 
                            border-2 border-white/20 flex items-center justify-center shadow-xl">
                <Package className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Edit Product
                </h1>
                <p className="text-sm sm:text-base text-pink-100">
                  Update product information
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                
                {/* Basic Information */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-purple-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Basic Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Product Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        Product Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Package className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Enter product name"
                          required
                          className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                   bg-slate-700 border-2 border-slate-600 rounded-xl
                                   text-white placeholder:text-gray-400
                                   focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 
                                   transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Brand */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        Brand
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Tag className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={formData.brand}
                          onChange={(e) => handleChange("brand", e.target.value)}
                          placeholder="Enter brand name"
                          className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                   bg-slate-700 border-2 border-slate-600 rounded-xl
                                   text-white placeholder:text-gray-400
                                   focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 
                                   transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        Category <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Layers className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          value={formData.category}
                          onChange={(e) => handleChange("category", e.target.value)}
                          required
                          className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                   bg-slate-700 border-2 border-slate-600 rounded-xl
                                   text-white appearance-none cursor-pointer
                                   focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 
                                   transition-all duration-200"
                        >
                          <option value="">Select Category</option>
                          {categories.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Enter product description"
                        rows="4"
                        className="w-full px-4 py-3 text-sm sm:text-base 
                                 bg-slate-700 border-2 border-slate-600 rounded-xl
                                 text-white placeholder:text-gray-400 resize-none
                                 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 
                                 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-900 text-gray-400">
                      Pricing & Inventory
                    </span>
                  </div>
                </div>

                {/* Pricing & Inventory */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-green-600/20 flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-green-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Pricing & Stock
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Price */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        Price <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={(e) => handleChange("price", e.target.value)}
                          placeholder="0.00"
                          required
                          className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                   bg-slate-700 border-2 border-slate-600 rounded-xl
                                   text-white placeholder:text-gray-400
                                   focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 
                                   transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Stock Count */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        Stock Count
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Box className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          min="0"
                          value={formData.countInStock}
                          onChange={(e) => handleChange("countInStock", e.target.value)}
                          placeholder="0"
                          className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                   bg-slate-700 border-2 border-slate-600 rounded-xl
                                   text-white placeholder:text-gray-400
                                   focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 
                                   transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-900 text-gray-400">
                      Media
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Product Image
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Image URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <ImageIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => handleChange("image", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                 bg-slate-700 border-2 border-slate-600 rounded-xl
                                 text-white placeholder:text-gray-400
                                 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 
                                 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3.5 sm:py-4 bg-slate-700 hover:bg-slate-600 
                             text-white rounded-xl font-semibold text-base
                             transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4
                             bg-gradient-to-r from-purple-600 to-pink-600 
                             hover:from-purple-700 hover:to-pink-700
                             disabled:from-slate-600 disabled:to-slate-700
                             text-white rounded-xl font-bold text-base sm:text-lg
                             shadow-xl shadow-purple-900/50 hover:shadow-2xl hover:shadow-purple-900/70
                             transition-all duration-300 transform hover:scale-105
                             disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Update Product</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Info Note */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                  <p className="text-sm text-blue-300">
                    <strong>Note:</strong> Changes will be reflected immediately in your product catalog.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
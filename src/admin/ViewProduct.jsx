import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import toast from "react-hot-toast";
import { 
  ArrowLeft, 
  Edit,
  Package, 
  DollarSign, 
  Layers,
  Tag,
  Box,
  ShoppingCart,
  Image as ImageIcon
} from "lucide-react";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleBack = () => {
    navigate("/admin/products");
  };

  const handleEdit = () => {
    navigate(`/admin/products/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-red-400 text-lg">Product not found</p>
          <button
            onClick={handleBack}
            className="mt-4 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-white 
                   mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-medium">Back to Products</span>
        </button>

        {/* Product View Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl 
                      border border-slate-700 shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 
                        px-6 sm:px-8 py-6 sm:py-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md 
                              border-2 border-white/20 flex items-center justify-center shadow-xl">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Product Details
                  </h1>
                  <p className="text-xs sm:text-sm text-pink-100 mt-1">
                    View complete product information
                  </p>
                </div>
              </div>

              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                         backdrop-blur-md border border-white/20 hover:border-white/40
                         text-white rounded-lg font-semibold transition-all duration-300
                         hover:scale-105"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column - Image */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Product Image
                  </h3>
                </div>

                {product.image ? (
                  <div className="relative group rounded-2xl overflow-hidden border-2 border-slate-700 
                                hover:border-purple-500/50 transition-all duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 bg-slate-800 rounded-2xl border-2 border-slate-700">
                    <div className="text-center">
                      <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-500">No image available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                
                {/* Product Name */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {product.name}
                  </h2>
                  {product.brand && (
                    <p className="text-gray-400 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      {product.brand}
                    </p>
                  )}
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Price Card */}
                  <div className="bg-gradient-to-br from-green-600/10 to-emerald-600/10 
                                border border-green-600/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <p className="text-sm text-gray-400">Price</p>
                    </div>
                    <p className="text-2xl font-bold text-green-400">
                      ${product.price?.toFixed(2)}
                    </p>
                  </div>

                  {/* Stock Card */}
                  <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 
                                border border-blue-600/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Box className="w-5 h-5 text-blue-400" />
                      <p className="text-sm text-gray-400">In Stock</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">
                      {product.countInStock || 0}
                    </p>
                  </div>
                </div>

                {/* Category Badge */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Category</p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl 
                                 bg-purple-600/20 border border-purple-500/50 text-purple-300">
                    <Layers className="w-4 h-4" />
                    <span className="font-semibold">
                      {product.category?.name || "Uncategorized"}
                    </span>
                  </span>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">Description</p>
                  <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                    <p className="text-gray-300 leading-relaxed">
                      {product.description || "No description available"}
                    </p>
                  </div>
                </div>

                {/* Stock Status Indicator */}
                <div className="flex items-center gap-3 p-4 rounded-xl border-2 
                              {(product.countInStock || 0) > 0 
                                ? 'bg-green-900/20 border-green-600/30' 
                                : 'bg-red-900/20 border-red-600/30'}">
                  <div className={`w-3 h-3 rounded-full ${
                    (product.countInStock || 0) > 0 
                      ? 'bg-green-400 animate-pulse' 
                      : 'bg-red-400'
                  }`}></div>
                  <p className={`font-semibold ${
                    (product.countInStock || 0) > 0 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {(product.countInStock || 0) > 0 
                      ? 'Available in Stock' 
                      : 'Out of Stock'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-slate-700">
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 
                         text-white rounded-xl font-semibold transition-all duration-300"
              >
                Back to Products
              </button>
              <button
                onClick={handleEdit}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3
                         bg-gradient-to-r from-purple-600 to-pink-600 
                         hover:from-purple-700 hover:to-pink-700
                         text-white rounded-xl font-bold
                         shadow-xl shadow-purple-900/50 hover:shadow-2xl hover:shadow-purple-900/70
                         transition-all duration-300 transform hover:scale-105"
              >
                <Edit className="w-5 h-5" />
                Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
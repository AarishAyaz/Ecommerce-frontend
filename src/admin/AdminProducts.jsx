import { useEffect, useState } from "react";
import axios from "../axios";
import { 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  ArrowLeft,
  Package,
  DollarSign,
  Layers,
  Filter,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/products");
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(product =>
        product.category?.name === categoryFilter
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, categoryFilter, products]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  const handleAddProduct = () => {
    navigate("/admin/products/add");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get unique categories for filter
  const categories = [...new Set(products.map(p => p.category?.name).filter(Boolean))];

  const stats = {
    total: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.price || 0), 0),
    categories: categories.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-white 
                   mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-medium">Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Products Management
              </h1>
              <p className="text-gray-400">Manage your product catalog and inventory</p>
            </div>
            
            <button
              onClick={handleAddProduct}
              className="flex items-center justify-center gap-2 px-6 py-3 
                       bg-gradient-to-r from-purple-600 to-pink-600
                       hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold
                       shadow-xl shadow-purple-900/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Products</p>
                <h3 className="text-3xl font-bold text-white">{stats.total}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Value</p>
                <h3 className="text-3xl font-bold text-white">${stats.totalValue.toFixed(0)}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Categories</p>
                <h3 className="text-3xl font-bold text-white">{stats.categories}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl
                         text-white placeholder:text-gray-400
                         focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
              />
            </div>

            {/* Category Filter */}
            <div className="sm:w-48 relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl
                         text-white appearance-none cursor-pointer
                         focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Export Button */}
            <button
              className="flex items-center justify-center gap-2 px-6 py-3
                       bg-slate-700 hover:bg-slate-600 text-white rounded-xl
                       font-semibold transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No products found</p>
              <p className="text-gray-500 text-sm mt-2">
                {searchQuery || categoryFilter !== "all" 
                  ? "Try adjusting your filters" 
                  : "Add some products to get started"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/80 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider hidden md:table-cell">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                      Category
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-700">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-slate-700/50 transition-colors duration-200"
                    >
                      {/* Product Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 
                                        flex items-center justify-center shadow-lg flex-shrink-0">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">{product.name}</p>
                            <p className="text-gray-400 text-sm md:hidden">
                              ${product.price?.toFixed(2)} • {product.category?.name || "Uncategorized"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          <span className="text-white font-semibold">
                            {product.price?.toFixed(2)}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                                       bg-blue-600/20 border border-blue-500/50 text-blue-300 
                                       text-xs font-bold">
                          <Layers className="w-3 h-3" />
                          {product.category?.name || "Uncategorized"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/products/view/${product._id}`)}
                            className="flex items-center gap-1.5 px-3 py-2
                                     bg-slate-700 hover:bg-slate-600 text-white rounded-lg
                                     transition-all duration-300 text-sm font-medium"
                            title="View product"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden xl:inline">View</span>
                          </button>

                          <button
                            onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                            className="flex items-center gap-1.5 px-3 py-2
                                     bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg
                                     transition-all duration-300 text-sm font-medium
                                     shadow-lg shadow-indigo-900/50"
                            title="Edit product"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="hidden xl:inline">Edit</span>
                          </button>

                          <button
                            onClick={() => handleDelete(product._id)}
                            className="flex items-center gap-1.5 px-3 py-2
                                     bg-red-600 hover:bg-red-700 text-white rounded-lg
                                     transition-all duration-300 text-sm font-medium
                                     shadow-lg shadow-red-900/50"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden xl:inline">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results Count */}
        {filteredProducts.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-400">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
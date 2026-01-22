import { useEffect, useState } from "react";
import { Edit, Trash2, Plus, ArrowLeft, Layers, Package, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchCategories,
  deleteCategory
} from "../api/categoryApi";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const loadCategories = async () => {
    try {
      setLoading(true);
      const { data } = await fetchCategories();
      setCategories(data);
      setFilteredCategories(data);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Filter categories based on search
  useEffect(() => {
    if (searchQuery) {
      const filtered = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchQuery, categories]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
      loadCategories();
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  const handleAddCategory = () => {
    navigate("/admin/categories/add");
  };

  useEffect(() => {
    loadCategories();
  }, []);

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
                Categories Management
              </h1>
              <p className="text-gray-400">Organize your product categories</p>
            </div>
            
            <button
              onClick={handleAddCategory}
              className="flex items-center justify-center gap-2 px-6 py-3 
                       bg-gradient-to-r from-green-600 to-emerald-600
                       hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold
                       shadow-xl shadow-green-900/50 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Categories</p>
              <h3 className="text-3xl font-bold text-white">{categories.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center">
              <Layers className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl
                       text-white placeholder:text-gray-400
                       focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20"
            />
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <Layers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                {searchQuery ? "No categories found" : "No categories yet"}
              </p>
              {!searchQuery && (
                <p className="text-gray-500 text-sm mt-2">
                  Add your first category to get started
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/80 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                      Products
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-700">
                  {filteredCategories.map((category) => (
                    <tr
                      key={category._id}
                      className="hover:bg-slate-700/50 transition-colors duration-200"
                    >
                      {/* Category Name */}
                      <td 
                        className="px-6 py-4 cursor-pointer"
                        onClick={() => navigate(`/admin/categories/${category._id}/products`)}
                      >
                        <div className="flex items-center gap-3 group">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 
                                        flex items-center justify-center shadow-lg">
                            <Layers className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold group-hover:text-green-400 transition-colors">
                              {category.name}
                            </p>
                            <p className="text-gray-400 text-sm sm:hidden">
                              View products →
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Products Count */}
                      <td className="px-6 py-4 text-center hidden sm:table-cell">
                        <button
                          onClick={() => navigate(`/admin/categories/${category._id}/products`)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                                   bg-blue-600/20 border border-blue-500/50 text-blue-300 
                                   text-xs font-bold hover:bg-blue-600/30 transition-colors"
                        >
                          <Package className="w-3 h-3" />
                          View Products
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/categories/edit/${category._id}`)}
                            className="flex items-center gap-1.5 px-3 py-2
                                     bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg
                                     transition-all duration-300 text-sm font-medium
                                     shadow-lg shadow-indigo-900/50"
                            title="Edit category"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="hidden md:inline">Edit</span>
                          </button>

                          <button
                            onClick={() => handleDelete(category._id)}
                            className="flex items-center gap-1.5 px-3 py-2
                                     bg-red-600 hover:bg-red-700 text-white rounded-lg
                                     transition-all duration-300 text-sm font-medium
                                     shadow-lg shadow-red-900/50"
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden md:inline">Delete</span>
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
        {filteredCategories.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-400">
            Showing {filteredCategories.length} of {categories.length} categories
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
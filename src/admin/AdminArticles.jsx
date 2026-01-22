import { useEffect, useState } from "react";
import { 
  Edit, 
  Trash2, 
  Plus, 
  ArrowLeft, 
  FileText, 
  User, 
  Calendar,
  Eye,
  Search,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchArticles,
  deleteArticle
} from "../api/articleApi";

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data);
      setFilteredArticles(data);
    } catch {
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  // Filter articles based on search
  useEffect(() => {
    if (searchQuery) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchQuery, articles]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      await deleteArticle(id);
      toast.success("Article deleted successfully");
      loadArticles();
    } catch {
      toast.error("Failed to delete article");
    }
  };

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  const handleAddArticle = () => {
    navigate("/admin/articles/add");
  };

  useEffect(() => {
    loadArticles();
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
                Articles Management
              </h1>
              <p className="text-gray-400">Manage blog posts and articles</p>
            </div>
            
            <button
              onClick={handleAddArticle}
              className="flex items-center justify-center gap-2 px-6 py-3 
                       bg-gradient-to-r from-orange-600 to-red-600
                       hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-bold
                       shadow-xl shadow-orange-900/50 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Write Article
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Articles</p>
              <h3 className="text-3xl font-bold text-white">{articles.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-600/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl
                         text-white placeholder:text-gray-400
                         focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
              />
            </div>

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

        {/* Articles Table */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                {searchQuery ? "No articles found" : "No articles yet"}
              </p>
              {!searchQuery && (
                <p className="text-gray-500 text-sm mt-2">
                  Write your first article to get started
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/80 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Article
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider hidden md:table-cell">
                      Author
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                      Date
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-700">
                  {filteredArticles.map((article) => (
                    <tr
                      key={article._id}
                      className="hover:bg-slate-700/50 transition-colors duration-200"
                    >
                      {/* Article Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-600 to-red-600 
                                        flex items-center justify-center shadow-lg">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold line-clamp-1">
                              {article.title}
                            </p>
                            <p className="text-gray-400 text-sm md:hidden">
                              {article.author || "Admin"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-gray-300">
                          <User className="w-4 h-4 text-gray-500" />
                          {article.author || "Admin"}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar className="w-4 h-4" />
                          {article.createdAt 
                            ? new Date(article.createdAt).toLocaleDateString() 
                            : "N/A"}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/articles/view/${article._id}`)}
                            className="flex items-center gap-1.5 px-3 py-2
                                     bg-slate-700 hover:bg-slate-600 text-white rounded-lg
                                     transition-all duration-300 text-sm font-medium"
                            title="View article"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden xl:inline">View</span>
                          </button>

                          <button
                            onClick={() => navigate(`/admin/articles/edit/${article._id}`)}
                            className="flex items-center gap-1.5 px-3 py-2
                                     bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg
                                     transition-all duration-300 text-sm font-medium
                                     shadow-lg shadow-indigo-900/50"
                            title="Edit article"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="hidden xl:inline">Edit</span>
                          </button>

                          <button
                            onClick={() => handleDelete(article._id)}
                            className="flex items-center gap-1.5 px-3 py-2
                                     bg-red-600 hover:bg-red-700 text-white rounded-lg
                                     transition-all duration-300 text-sm font-medium
                                     shadow-lg shadow-red-900/50"
                            title="Delete article"
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
        {filteredArticles.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-400">
            Showing {filteredArticles.length} of {articles.length} articles
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminArticles;
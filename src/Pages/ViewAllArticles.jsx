import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import toast from "react-hot-toast";
import {
  Home,
  ChevronRight,
  BookOpen,
  Search,
  ArrowUpDown,
  SlidersHorizontal,
  AlertCircle,
  Sparkles
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ViewAllArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BASE_URL}/api/articles`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }
        
        const data = await res.json();
        setArticles(data || []);
      } catch (err) {
        console.error(err);
        const errorMessage = err.message || "Unable to load articles. Please try again later.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetch(`${BASE_URL}/api/articles`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      })
      .then(data => setArticles(data || []))
      .catch(err => {
        console.error(err);
        const errorMessage = err.message || "Unable to load articles. Please try again later.";
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => setLoading(false));
  };

  // Filter articles based on search
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "newest":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case "oldest":
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      default:
        return 0;
    }
  });

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        {/* Breadcrumb Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="h-6 w-48 bg-slate-800/50 rounded animate-pulse mb-8" />
        </div>

        {/* Header Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="h-12 w-64 bg-slate-800/50 rounded animate-pulse mb-4" />
          <div className="h-6 w-96 bg-slate-800/50 rounded animate-pulse mb-8" />
          
          {/* Search & Sort Skeleton */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="h-12 flex-1 max-w-2xl bg-slate-800/50 rounded-xl animate-pulse" />
            <div className="h-12 w-48 bg-slate-800/50 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-slate-700/50" />
                <div className="p-6 space-y-4">
                  <div className="h-7 bg-slate-700/50 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-700/50 rounded" />
                    <div className="h-4 bg-slate-700/50 rounded w-5/6" />
                    <div className="h-4 bg-slate-700/50 rounded w-4/6" />
                  </div>
                  <div className="h-10 bg-slate-700/50 rounded-full w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h2>
            
            <p className="text-gray-400 mb-8 text-lg">
              {error}
            </p>
            
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-8 py-4
                       bg-gradient-to-r from-blue-600 to-indigo-600 
                       hover:from-blue-500 hover:to-indigo-500
                       text-white font-semibold rounded-full 
                       shadow-lg hover:shadow-xl
                       transform hover:scale-105
                       transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="pt-8 pb-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium">Articles</span>
          </nav>
        </div>

        {/* Header */}
        <div className="py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600/20 border border-blue-400/30 rounded-xl">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              All Articles
            </h1>
          </div>
          
          <p className="text-gray-400 text-lg mb-8">
            Browse our complete collection of {articles.length} articles
          </p>

          {/* Search & Sort Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 
                           bg-slate-800/50 border border-slate-700/50
                           text-white placeholder-gray-400
                           rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-12 pr-10 py-3 w-full lg:w-64
                         bg-slate-800/50 border border-slate-700/50
                         text-white text-sm font-medium
                         rounded-xl cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200
                         hover:border-slate-600"
              >
                <option value="default">Default Sorting</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title: A to Z</option>
                <option value="title-desc">Title: Z to A</option>
              </select>
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none rotate-90" />
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Showing <span className="text-white font-semibold">{sortedArticles.length}</span> of{" "}
              <span className="text-white font-semibold">{articles.length}</span> articles
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="pb-16">
          {sortedArticles.length === 0 ? (
            // Empty State
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 border border-slate-700/50 rounded-full mb-6">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No articles found
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : "We're currently working on new content. Check back soon!"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedArticles.map((article) => (
                <ArticleCard
                  key={article._id || article.id}
                  title={article.title}
                  description={article.content?.substring(0, 150) + "..." || "No description available"}
                  image={`${BASE_URL}${article.image}`}
                  onReadMore={() => navigate(`/articles/${article._id || article.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewAllArticlesPage;
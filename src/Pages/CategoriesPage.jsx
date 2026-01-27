import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid3x3, Home, ChevronRight, AlertCircle, Search } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BASE_URL}/api/categories`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetch(`${BASE_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => {
        console.error(err);
        setError("Unable to load categories. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        {/* Breadcrumb Skeleton */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <div className="h-6 w-48 bg-slate-800/50 rounded animate-pulse mb-8" />
        </div>

        {/* Header Skeleton */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="h-12 w-64 bg-slate-800/50 rounded animate-pulse mb-4" />
          <div className="h-6 w-96 bg-slate-800/50 rounded animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-56 bg-slate-700/50" />
                <div className="p-5">
                  <div className="h-6 bg-slate-700/50 rounded w-3/4 mx-auto" />
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
        <div className="max-w-7xl mx-auto px-6 py-16">
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
                       bg-gradient-to-r from-indigo-600 to-purple-600 
                       hover:from-indigo-500 hover:to-purple-500
                       text-white font-semibold rounded-full 
                       shadow-lg hover:shadow-xl
                       transform hover:scale-105
                       transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <nav className="flex items-center gap-2 text-sm mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <span className="text-white font-medium">Categories</span>
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600/20 border border-indigo-400/30 rounded-xl">
            <Grid3x3 className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            All Categories
          </h1>
        </div>
        
        <p className="text-gray-400 text-lg mb-8">
          Browse our complete collection of {categories.length} categories
        </p>

        {/* Search Bar */}
        <div className="max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 
                       bg-slate-800/50 border border-slate-700/50
                       text-white placeholder-gray-400
                       rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {filteredCategories.length === 0 ? (
          // Empty Search State
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 border border-slate-700/50 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No categories found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map(cat => (
              <div
                key={cat._id}
                onClick={() => navigate(`/categories/${cat._id}`)}
                className="group cursor-pointer bg-slate-800/50 backdrop-blur-sm 
                         border border-slate-700/50 rounded-2xl overflow-hidden
                         hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20
                         transform hover:scale-105 hover:-translate-y-1
                         transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={`${BASE_URL}${cat.image}`}
                    alt={cat.name}
                    className="h-full w-full object-cover 
                             group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5 text-center">
                  <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors duration-200">
                    {cat.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
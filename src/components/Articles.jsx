import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { BookOpen, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        // Show only 3 latest articles
        setArticles(data.slice(0, 3) || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/articles/${id}`);
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetch(`${BASE_URL}/api/articles`)
      .then(res => res.json())
      .then(data => setArticles(data.slice(0, 3) || []))
      .catch(err => {
        console.error(err);
        setError("Unable to load articles. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  // Loading State
  if (loading) {
    return (
      <section
        id="articles"
        className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
      >
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-semibold uppercase tracking-wide">
              Knowledge Hub
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Latest Articles & Guides
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Stay updated with the latest trends, expert tips, and comprehensive reviews
          </p>
        </div>

        {/* Skeleton Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section
        id="articles"
        className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              Oops! Something went wrong
            </h3>
            
            <p className="text-gray-400 mb-8">
              {error}
            </p>
            
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-8 py-3
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
      </section>
    );
  }

  // Empty State
  if (articles.length === 0) {
    return (
      <section
        id="articles"
        className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <BookOpen className="w-10 h-10 text-blue-400" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3">
              No Articles Available
            </h3>
            
            <p className="text-gray-400">
              We're currently working on new content. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="articles"
      className="py-16 bg-gradient-to-b from-black via-slate-900 to-black"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-blue-300 text-sm font-semibold uppercase tracking-wide">
            Knowledge Hub
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Latest Articles & Guides
        </h2>

        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Stay updated with the latest trends, expert tips, and comprehensive reviews
        </p>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              title={article.title}
              description={article.content?.substring(0, 150) + "..." || "No description available"}
              image={`${BASE_URL}${article.image}`}
              onReadMore={() => handleReadMore(article._id)}
            />
          ))}
        </div>
      </div>

      {/* View All Articles Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
        <button
          onClick={() => navigate("/articles")}
          className="group inline-flex items-center gap-2 px-10 py-4
                   bg-gradient-to-r from-blue-600 to-indigo-600 
                   hover:from-blue-500 hover:to-indigo-500
                   text-white font-bold rounded-full
                   shadow-lg hover:shadow-xl
                   transform hover:scale-105
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </section>
  );
};

export default ArticlesSection;
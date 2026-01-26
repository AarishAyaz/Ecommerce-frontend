import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/articles");
        if (!res.ok) throw new Error("Failed to fetch articles");

        const data = await res.json();
        // Use 'result' key based on your backend response
        setArticles(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleReadMore = (id) => {
    // Navigate to article detail page
    navigate(`/articles/${id}`);
  };

  if (loading)
    return (
      <section className="py-12 bg-gradient-to-b from-black via-slate-900 to-black text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-400 mt-4">Loading articles...</p>
      </section>
    );

  if (error)
    return (
      <section className="py-12 bg-gradient-to-b from-black via-slate-900 to-black text-center">
        <p className="text-red-400 text-lg">{error}</p>
      </section>
    );

  return (
    <section
      id="articles"
      className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-black via-slate-900 to-black"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-full mb-3 sm:mb-4">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
          <span className="text-blue-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Knowledge Hub
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
          Latest Articles & Guides
        </h2>

        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto">
          Stay updated with the latest trends, expert tips, and comprehensive reviews
        </p>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              description={article.content.substring(0, 150) + "..."}
              image={`http://localhost:5000${article.image}`}
              onReadMore={() => handleReadMore(article.id)}
            />
          ))}
        </div>
      </div>

      {/* View All Articles Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16">
        <button
          onClick={() => navigate("/articles")}
          className="group inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold rounded-full shadow-xl shadow-blue-900/50 hover:shadow-2xl hover:shadow-blue-900/70 transition-all duration-300 transform hover:scale-105"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default ArticlesSection;

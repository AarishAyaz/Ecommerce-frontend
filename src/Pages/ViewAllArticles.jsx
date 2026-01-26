import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import toast from "react-hot-toast";

const ViewAllArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/articles");
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data = await res.json();
        setArticles(data || []);
      } catch (err) {
        toast.error(err.message || "Error fetching articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="text-white text-lg">Loading articles...</div>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
          All Articles
        </h1>
        {articles.length === 0 ? (
          <p className="text-gray-400">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                description={article.content.substring(0, 150) + "..."}
                image={article.image ? `http://localhost:5000${article.image}` : ""}
                onReadMore={() => navigate(`/articles/${article.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewAllArticlesPage;

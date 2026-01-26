import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/articles/${id}`);
        if (!res.ok) throw new Error("Failed to fetch article");
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        toast.error(err.message || "Error fetching article");
        navigate("/articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id, navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="text-white text-lg">Loading article...</div>
      </div>
    );

  if (!article)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-slate-900 to-black">
        <p className="text-white">Article not found.</p>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white px-6 py-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Articles</span>
        </button>

        {/* Article Image */}
        {article.image && (
          <img
            src={`http://localhost:5000${article.image}`}
            alt={article.title}
            className="w-full h-80 object-cover"
          />
        )}

        {/* Article Content */}
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {article.title}
          </h1>
          <p className="text-gray-400 mb-6">{article.content}</p>
          {article.author && (
            <p className="text-gray-400">
              <strong>Author:</strong> {article.author}
            </p>
          )}
          {article.category && (
            <p className="text-gray-400 mt-1">
              <strong>Category:</strong> {article.category}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticleDetailPage;

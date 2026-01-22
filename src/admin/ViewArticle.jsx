import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticleById } from "../api/articleApi";
import { ArrowLeft, Edit } from "lucide-react";

const ViewArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const { data } = await fetchArticleById(id);
        setArticle(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) return <p className="p-6 text-white">Loading...</p>;
  if (!article) return <p className="p-6 text-red-500">Article not found</p>;

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl p-6 border border-slate-700">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/admin/articles")}
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={() => navigate(`/admin/articles/edit/${article._id}`)}
            className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg"
          >
            <Edit size={16} />
            Edit
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex gap-6 text-sm text-gray-400 mb-6">
          <p>
            Author:{" "}
            <span className="text-white">
              {article?.author}
            </span>
          </p>
          <p>
            Category:{" "}
            <span className="text-white">
              {article?.category}
            </span>
          </p>
          <p>
            Created:{" "}
            {new Date(article.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Image */}
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {article.content}
        </div>

      </div>
    </div>
  );
};

export default ViewArticle;

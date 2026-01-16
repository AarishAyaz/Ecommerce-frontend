import { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchArticles,
  deleteArticle
} from "../api/articleApi";

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const loadArticles = async () => {
    try {
      const { data } = await fetchArticles();
      setArticles(data);
    } catch {
      toast.error("Failed to load articles");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    await deleteArticle(id);
    toast.success("Article deleted");
    loadArticles();
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Articles</h1>
        <button
          onClick={() => navigate("/admin/articles/add")}
          className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Article
        </button>
      </div>

      <table className="w-full bg-slate-900 border border-slate-700 rounded-lg">
        <thead>
          <tr className="text-gray-400">
            <th className="p-4 text-left">Title</th>
            <th className="p-4">Author</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {articles.length === 0 && (
            <tr>
              <td colSpan="3" className="p-6 text-center text-gray-400">
                No articles found
              </td>
            </tr>
          )}

          {articles.map((a) => (
            <tr key={a._id} className="border-t border-slate-700">
              <td className="p-4">{a.title}</td>
              <td className="p-4">{a.author || "Admin"}</td>
              <td className="p-4 flex justify-end gap-4">
                <Edit
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/articles/edit/${a._id}`)
                  }
                />
                <Trash2
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDelete(a._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticles;

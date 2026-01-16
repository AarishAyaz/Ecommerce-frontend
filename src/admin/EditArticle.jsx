import { useEffect, useState } from "react";
import { fetchArticleById, updateArticle } from "../api/articleApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchArticleById(id).then(({ data }) => setForm(data));
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await updateArticle(id, form);
    toast.success("Article updated");
    navigate("/admin/articles");
  };

  return (
    <form onSubmit={submitHandler} className="p-8 text-white max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>

      <input
        value={form.title || ""}
        className="w-full mb-4 p-3 bg-slate-800 rounded"
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        value={form.author || ""}
        className="w-full mb-4 p-3 bg-slate-800 rounded"
        onChange={(e) =>
          setForm({ ...form, author: e.target.value })
        }
      />

      <textarea
        rows="6"
        value={form.content || ""}
        className="w-full mb-4 p-3 bg-slate-800 rounded"
        onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        }
      />

      <button className="bg-indigo-600 px-6 py-2 rounded">
        Update
      </button>
    </form>
  );
};

export default EditArticle;

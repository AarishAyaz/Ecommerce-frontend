import { useState } from "react";
import { createArticle } from "../api/articleApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddArticle = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: ""
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await createArticle(form);
    toast.success("Article created");
    navigate("/admin/articles");
  };

  return (
    <form onSubmit={submitHandler} className="p-8 text-white max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Add Article</h1>

      <input
        placeholder="Title"
        className="w-full mb-4 p-3 bg-slate-800 rounded"
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        placeholder="Author"
        className="w-full mb-4 p-3 bg-slate-800 rounded"
        onChange={(e) =>
          setForm({ ...form, author: e.target.value })
        }
      />

      <textarea
        placeholder="Content"
        rows="6"
        className="w-full mb-4 p-3 bg-slate-800 rounded"
        onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        }
      />

      <button className="bg-indigo-600 px-6 py-2 rounded">
        Publish
      </button>
    </form>
  );
};

export default AddArticle;

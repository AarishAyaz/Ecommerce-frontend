import { useEffect, useState } from "react";
import { fetchArticleById, updateArticle } from "../api/articleApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Save,
  FileText,
  User,
  Type,
  Image as ImageIcon,
  Tag,
} from "lucide-react";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const { data } = await fetchArticleById(id);
        setForm({
          title: data.title || "",
          content: data.content || "",
          author: data.author || "",
          category: data.category || "",
          image: null,
        });
        setCurrentImage(data.image || null);
      } catch (error) {
        toast.error("Failed to load article", error);
        navigate("/admin/articles");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      return toast.error("Title and content are required");
    }
    const data = new FormData();
    data.append("title", form.title);
    data.append("content", form.content);
    data.append("author", form.author);
    data.append("category", form.category);

    if (form.image instanceof File) {
      data.append("image", form.image);
    }
    setSubmitting(true);

    try {
      await updateArticle(id, data);
      toast.success("Article updated successfully");
      navigate("/admin/articles");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update article");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/articles");
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-white 
                   mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-medium">
            Back to Articles
          </span>
        </button>

        {/* Form Card */}
        <div
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl 
                      border border-slate-700 shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div
            className="relative bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 
                        px-6 sm:px-8 py-8 sm:py-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10 flex items-center gap-4 sm:gap-6">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md 
                            border-2 border-white/20 flex items-center justify-center shadow-xl"
              >
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Edit Article
                </h1>
                <p className="text-sm sm:text-base text-orange-100">
                  Update article information
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={submitHandler}>
            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                {/* Article Details */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-orange-600/20 flex items-center justify-center">
                      <Type className="w-4 h-4 text-orange-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Article Details
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        Article Title <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={form.title}
                          onChange={(e) =>
                            handleChange("title", e.target.value)
                          }
                          placeholder="Enter article title"
                          required
                          className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                   bg-slate-700 border-2 border-slate-600 rounded-xl
                                   text-white placeholder:text-gray-400
                                   focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 
                                   transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Author & Category Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Author */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">
                          Author
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={form.author}
                            onChange={(e) =>
                              handleChange("author", e.target.value)
                            }
                            placeholder="Author name"
                            className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                     bg-slate-700 border-2 border-slate-600 rounded-xl
                                     text-white placeholder:text-gray-400
                                     focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 
                                     transition-all duration-200"
                          />
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-2">
                          Category
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Tag className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={form.category}
                            onChange={(e) =>
                              handleChange("category", e.target.value)
                            }
                            placeholder="e.g. Technology, Business"
                            className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                     bg-slate-700 border-2 border-slate-600 rounded-xl
                                     text-white placeholder:text-gray-400
                                     focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 
                                     transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        Article Content <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        value={form.content}
                        onChange={(e) =>
                          handleChange("content", e.target.value)
                        }
                        placeholder="Write your article content here..."
                        rows="10"
                        required
                        className="w-full px-4 py-3 text-sm sm:text-base 
                                 bg-slate-700 border-2 border-slate-600 rounded-xl
                                 text-white placeholder:text-gray-400 resize-none
                                 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 
                                 transition-all duration-200"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Write the full content of your article. Supports
                        markdown formatting.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-900 text-gray-400">
                      Featured Image
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Featured Image
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Image URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <ImageIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleChange("image", e.target.files[0])
                        }
                        placeholder="https://example.com/image.jpg"
                        className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                 bg-slate-700 border-2 border-slate-600 rounded-xl
                                 text-white placeholder:text-gray-400
                                 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 
                                 transition-all duration-200"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Add a featured image URL for your article
                    </p>
                  </div>
                  {currentImage && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-2">
                        Current Image
                      </p>
                      <img
                        src={`${BASE_URL}${currentImage}`}
                        alt="Current"
                        className="w-64 rounded-xl border border-slate-600"
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3.5 sm:py-4 bg-slate-700 hover:bg-slate-600 
                             text-white rounded-xl font-semibold text-base
                             transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4
                             bg-gradient-to-r from-orange-600 to-red-600 
                             hover:from-orange-700 hover:to-red-700
                             disabled:from-slate-600 disabled:to-slate-700
                             text-white rounded-xl font-bold text-base sm:text-lg
                             shadow-xl shadow-orange-900/50 hover:shadow-2xl hover:shadow-orange-900/70
                             transition-all duration-300 transform hover:scale-105
                             disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Update Article</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Info Note */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                  <p className="text-sm text-blue-300">
                    <strong>Note:</strong> Changes will be reflected immediately
                    on your website.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createCategory } from "../api/categoryApi.js";
import { ArrowLeft, Save, Layers, Tag, Info } from "lucide-react";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

const submitHandler = async (e) => {
  e.preventDefault();

  if (!name.trim()) return toast.error("Category name is required");
  if (!image) return toast.error("Category image is required");

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    await createCategory(formData);

    toast.success("Category created successfully");
    navigate("/admin/categories");
  } catch (error) {
    console.error(error.response?.data);
    toast.error(error.response?.data?.message || "Creation failed");
  } finally {
    setLoading(false);
  }
};


  const handleBack = () => {
    navigate("/admin/categories");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-white 
                   mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-medium">
            Back to Categories
          </span>
        </button>

        {/* Form Card */}
        <div
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl 
                      border border-slate-700 shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div
            className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 
                        px-6 sm:px-8 py-8 sm:py-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10 flex items-center gap-4 sm:gap-6">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md 
                            border-2 border-white/20 flex items-center justify-center shadow-xl"
              >
                <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Add New Category
                </h1>
                <p className="text-sm sm:text-base text-emerald-100">
                  Create a new product category
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={submitHandler}>
            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                {/* Category Details Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-green-600/20 flex items-center justify-center">
                      <Tag className="w-4 h-4 text-green-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Category Details
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {/* Category Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        Category Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Tag className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Electronics, Fashion, Furniture"
                          required
                          className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                   bg-slate-700 border-2 border-slate-600 rounded-xl
                                   text-white placeholder:text-gray-400
                                   focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 
                                   transition-all duration-200"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Choose a clear, descriptive name for this category
                      </p>
                    </div>
                    {/* Category Image */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        Category Image <span className="text-red-400">*</span>
                      </label>

                      <div className="flex items-center gap-4">
                        {/* Preview */}
                        <div
                          className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-600 
                    flex items-center justify-center overflow-hidden bg-slate-700"
                        >
                          {preview ? (
                            <img
                              src={preview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-gray-400 text-center px-2">
                              Image Preview
                            </span>
                          )}
                        </div>

                        {/* File Input */}
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <div
                            className="px-5 py-3 bg-slate-700 hover:bg-slate-600 
                   border border-slate-600 rounded-xl
                   text-sm font-semibold text-white
                   transition-all"
                          >
                            Upload Image
                          </div>
                        </label>
                      </div>

                      <p className="mt-2 text-xs text-gray-500">
                        Recommended: 800×800px · JPG, PNG, WEBP · Max 2MB
                      </p>
                    </div>

                    {/* Category Description (Optional) */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-200 mb-2">
                        Description{" "}
                        <span className="text-gray-500 text-xs">
                          (Optional)
                        </span>
                      </label>
                      <div className="relative">
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Add a brief description of this category..."
                          rows="4"
                          className="w-full px-4 py-3 text-sm sm:text-base 
                                   bg-slate-700 border-2 border-slate-600 rounded-xl
                                   text-white placeholder:text-gray-400 resize-none
                                   focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 
                                   transition-all duration-200"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Help customers understand what products belong in this
                        category
                      </p>
                    </div>

                    {/* Preview */}
                    {name.trim() && (
                      <div className="bg-slate-700/50 rounded-xl p-4 border-2 border-slate-600">
                        <p className="text-xs text-gray-400 mb-2 font-semibold">
                          Preview:
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                            <Layers className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-base font-bold text-white">
                              {name}
                            </p>
                            {description && (
                              <p className="text-sm text-gray-400 line-clamp-1">
                                {description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 flex gap-3">
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-300">
                      <strong>Important:</strong> Categories help organize your
                      products and make it easier for customers to find what
                      they're looking for. You can always edit or delete
                      categories later.
                    </p>
                  </div>
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
                    disabled={loading || !name.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4
                             bg-gradient-to-r from-green-600 to-emerald-600 
                             hover:from-green-700 hover:to-emerald-700
                             disabled:from-slate-600 disabled:to-slate-700
                             text-white rounded-xl font-bold text-base sm:text-lg
                             shadow-xl shadow-green-900/50 hover:shadow-2xl hover:shadow-green-900/70
                             transition-all duration-300 transform hover:scale-105
                             disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Create Category</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400" />
            Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>
                Use clear, single-word names when possible (e.g., "Electronics"
                not "Electronic Items")
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>Keep category names consistent with your brand voice</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">•</span>
              <span>
                Avoid creating too many categories - aim for 5-15 main
                categories
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;

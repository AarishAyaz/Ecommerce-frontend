import { useState } from "react";
import { ArrowLeft, Save, User, Mail, Lock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../axios";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const auth = JSON.parse(localStorage.getItem("auth"));

    await axios.post(
      "/api/admin/users",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: formData.role === "admin", // FIX
      },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`, // FIX
        },
      }
    );

    toast.success("User added successfully!");
    navigate("/admin/users");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add user");
  } finally {
    setLoading(false);
  }
};



  const handleBack = () => {
    console.log("Navigate back to /admin/users");
    navigate("/admin/users");
    // In your app: navigate("/admin/users");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-white 
                   mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-medium">Back to Users</span>
        </button>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl 
                      border border-slate-700 shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                        px-6 sm:px-8 py-8 sm:py-10 overflow-hidden">
            {/* Decorative blur circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10 flex items-center gap-4 sm:gap-6">
              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md 
                            border-2 border-white/20 flex items-center justify-center shadow-xl">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              
              {/* Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Add New User
                </h1>
                <p className="text-sm sm:text-base text-indigo-100">
                  Create a new user account for the platform
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              
              {/* User Information Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    User Information
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                        className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                 bg-slate-700 border-2 border-slate-600 rounded-xl
                                 text-white placeholder:text-gray-400
                                 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 
                                 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="user@example.com"
                        required
                        className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                 bg-slate-700 border-2 border-slate-600 rounded-xl
                                 text-white placeholder:text-gray-400
                                 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 
                                 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter secure password"
                        required
                        className="w-full pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base 
                                 bg-slate-700 border-2 border-slate-600 rounded-xl
                                 text-white placeholder:text-gray-400
                                 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 
                                 transition-all duration-200"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Password must be at least 8 characters long
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
                    Permissions
                  </span>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-purple-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    User Role
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* User Role */}
                  <label className="relative flex items-start gap-4 p-4 bg-slate-700/50 
                                  border-2 border-slate-600 rounded-xl cursor-pointer
                                  hover:border-indigo-500/50 transition-all duration-300
                                  has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-600/10">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === "user"}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-indigo-600 bg-slate-600 border-slate-500
                               focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-white">User</span>
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">
                          Default
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        Standard user with basic access to browse and purchase products
                      </p>
                    </div>
                  </label>

                  {/* Admin Role */}
                  <label className="relative flex items-start gap-4 p-4 bg-slate-700/50 
                                  border-2 border-slate-600 rounded-xl cursor-pointer
                                  hover:border-indigo-500/50 transition-all duration-300
                                  has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-600/10">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formData.role === "admin"}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-indigo-600 bg-slate-600 border-slate-500
                               focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-white">Administrator</span>
                        <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded">
                          Full Access
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        Full administrative access to manage users, products, and settings
                      </p>
                    </div>
                  </label>
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
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4
                           bg-gradient-to-r from-indigo-600 to-purple-600 
                           hover:from-indigo-700 hover:to-purple-700
                           disabled:from-slate-600 disabled:to-slate-700
                           text-white rounded-xl font-bold text-base sm:text-lg
                           shadow-xl shadow-indigo-900/50 hover:shadow-2xl hover:shadow-indigo-900/70
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
                      <span>Create User</span>
                    </>
                  )}
                </button>
              </div>

              {/* Info Note */}
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                <p className="text-sm text-blue-300">
                  <strong>Note:</strong> The user will receive a welcome email with login instructions 
                  at the provided email address.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
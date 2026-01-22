import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchUserById, updateUser } from "../api/userApi";
import { ArrowLeft, Save, User, Mail, Shield } from "lucide-react";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await fetchUserById(id);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        toast.error("Failed to load user", error);
        navigate("/admin/users");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      return toast.error("All fields are required");
    }

    setSubmitting(true);

    try {
      await updateUser(id, {
        name,
        email,
        isAdmin,
      });

      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/users");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading user data...</p>
        </div>
      </div>
    );
  }

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
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10 flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md 
                            border-2 border-white/20 flex items-center justify-center shadow-xl">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Edit User
                </h1>
                <p className="text-sm sm:text-base text-indigo-100">
                  Update user information and permissions
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={submitHandler}>
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
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                        checked={!isAdmin}
                        onChange={() => setIsAdmin(false)}
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
                        checked={isAdmin}
                        onChange={() => setIsAdmin(true)}
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
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4
                             bg-gradient-to-r from-indigo-600 to-purple-600 
                             hover:from-indigo-700 hover:to-purple-700
                             disabled:from-slate-600 disabled:to-slate-700
                             text-white rounded-xl font-bold text-base sm:text-lg
                             shadow-xl shadow-indigo-900/50 hover:shadow-2xl hover:shadow-indigo-900/70
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
                        <span>Update User</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Info Note */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                  <p className="text-sm text-blue-300">
                    <strong>Note:</strong> Changing the user role will immediately update their access permissions.
                    Admin users will have full access to the admin dashboard.
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

export default EditUser;
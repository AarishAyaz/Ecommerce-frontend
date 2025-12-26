import { useState } from "react";
import {
  User,
  Lock,
  Save,
  ArrowLeft,
  CheckCircle,
  Mail,
  Key,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [name, setName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Name cannot be empty");
    }

    if (newPassword && newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    try {
      setLoading(true);

      const payload = { name };

      if (newPassword) {
        payload.password = newPassword;
        payload.currentPassword = currentPassword; // for future backend validation
      }

      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Profile updated successfully 🎉");
      setIsSuccess(true);

      setCurrentPassword("");
      setNewPassword("");
      localStorage.removeItem("token"); // log out user after profile update
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black pt-20 px-4 pb-12">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
                <p className="text-indigo-100 text-sm">
                  Manage your account settings
                </p>
              </div>
            </div>
          </div>

          {/* Success */}
          {isSuccess && (
            <div className="m-6 p-4 bg-green-900/20 border border-green-500/40 rounded-xl flex items-center gap-2">
              <CheckCircle className="text-green-400 w-5 h-5" />
              <span className="text-green-400 text-sm font-semibold">
                Profile updated successfully
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-300">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-300">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                <input
                  value={user?.email}
                  disabled
                  className="w-full pl-12 py-3 bg-slate-800 border border-slate-700 rounded-xl text-gray-400"
                />
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3" /> Email cannot be changed
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-slate-700 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-slate-700 rounded-xl text-white"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-4 rounded-xl font-bold text-white flex justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5" /> Save Changes
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              Leave password fields empty to keep current password
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

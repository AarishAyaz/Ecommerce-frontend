import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { 
  Users, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  ArrowLeft,
  Shield,
  User,
  Mail,
  Calendar,
  Filter,
  Download
} from "lucide-react";
import toast from "react-hot-toast";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/admin/users")
      .then((res) => {
        const userList = Array.isArray(res.data) ? res.data : [];
        setUsers(userList);
        setFilteredUsers(userList);
      })
      .catch((err) => {
        console.error(err.response?.data);
        setError(err.response?.data?.message || "Failed to load users");
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter users based on search and role
  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter(user =>
        roleFilter === "admin" ? user.isAdmin : !user.isAdmin
      );
    }

    setFilteredUsers(filtered);
  }, [searchQuery, roleFilter, users]);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success("User deleted");
    } catch (err) {
      console.error(err.response?.data);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  const handleAddUser = () => {
    navigate("/admin/users/add");
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/users/${userId}/edit`);
  };

  const stats = {
    total: users.length,
    admins: users.filter(u => u.isAdmin).length,
    regularUsers: users.filter(u => !u.isAdmin).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-white 
                   mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base font-medium">Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Users Management
              </h1>
              <p className="text-gray-400">Manage all registered users and their permissions</p>
            </div>
            
            <button
              onClick={handleAddUser}
              className="flex items-center justify-center gap-2 px-6 py-3 
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold
                       shadow-xl shadow-blue-900/50 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add New User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Users</p>
                <h3 className="text-3xl font-bold text-white">{stats.total}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Administrators</p>
                <h3 className="text-3xl font-bold text-white">{stats.admins}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Regular Users</p>
                <h3 className="text-3xl font-bold text-white">{stats.regularUsers}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center">
                <User className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl
                         text-white placeholder:text-gray-400
                         focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
              />
            </div>

            {/* Role Filter */}
            <div className="sm:w-48 relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl
                         text-white appearance-none cursor-pointer
                         focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins</option>
                <option value="user">Users</option>
              </select>
            </div>

            {/* Export Button */}
            <button
              className="flex items-center justify-center gap-2 px-6 py-3
                       bg-slate-700 hover:bg-slate-600 text-white rounded-xl
                       font-semibold transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/80 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase tracking-wider hidden md:table-cell">
                      Email
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-700">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center">
                        <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No users found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-slate-700/50 transition-colors duration-200"
                      >
                        {/* User Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 
                                          flex items-center justify-center shadow-lg">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-semibold">{user.name}</p>
                              <p className="text-gray-400 text-sm md:hidden">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Mail className="w-4 h-4 text-gray-500" />
                            {user.email}
                          </div>
                        </td>

                        {/* Role Badge */}
                        <td className="px-6 py-4 text-center">
                          {user.isAdmin ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                                           bg-purple-600/20 border border-purple-500/50 text-purple-300 
                                           text-xs font-bold">
                              <Shield className="w-3 h-3" />
                              Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                                           bg-slate-700 border border-slate-600 text-slate-300 
                                           text-xs font-bold">
                              <User className="w-3 h-3" />
                              User
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEditUser(user._id)}
                              className="flex items-center gap-1.5 px-3 py-2
                                       bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg
                                       transition-all duration-300 text-sm font-medium
                                       shadow-lg shadow-indigo-900/50"
                              title="Edit user"
                            >
                              <Edit className="w-4 h-4" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>

                            <button
                              onClick={() => handleDelete(user._id)}
                              className="flex items-center gap-1.5 px-3 py-2
                                       bg-red-600 hover:bg-red-700 text-white rounded-lg
                                       transition-all duration-300 text-sm font-medium
                                       shadow-lg shadow-red-900/50"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results Count */}
        {filteredUsers.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-400">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
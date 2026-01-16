import { useNavigate } from "react-router-dom";
import {
  Users,
  Package,
  Layers,
  FileText,
  LogOut,
  ShoppingBag,
  Eye,
  Edit,
  Plus,
  BarChart3,
} from "lucide-react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock stats (replace with API later)
  const stats = {
    totalUsers: 1234,
    totalProducts: 567,
    totalCategories: 12,
    totalArticles: 89,
  };

  /* ======================
     NAVIGATION HANDLERS
  ====================== */
  const handleViewAll = (section) => {
    navigate(`/admin/${section}`);
  };

  const handleAdd = (section) => {
    navigate(`/admin/${section}/add`);
  };

  const handleExtraAction = (section, action) => {
    console.log(`${action} clicked for ${section}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const managementCards = [
    {
      id: "users",
      title: "Users",
      description: "Manage registered users and permissions",
      icon: Users,
      color: "from-blue-600 to-cyan-600",
      stats: stats.totalUsers,
      actions: ["View All", "Add User"],
    },
    {
      id: "products",
      title: "Products",
      description: "Add, edit, and manage products",
      icon: Package,
      color: "from-purple-600 to-pink-600",
      stats: stats.totalProducts,
      actions: ["View All", "Add Product"],
    },
    {
      id: "categories",
      title: "Categories",
      description: "Organize and manage product categories",
      icon: Layers,
      color: "from-green-600 to-emerald-600",
      stats: stats.totalCategories,
      actions: ["View All", "Add Category"],
    },
    {
      id: "articles",
      title: "Articles",
      description: "Create and manage blog articles",
      icon: FileText,
      color: "from-orange-600 to-red-600",
      stats: stats.totalArticles,
      actions: ["View All", "Write Article"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* ================= HEADER ================= */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-400">
                  Manage your e-commerce platform
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5
                         bg-red-600 hover:bg-red-700 text-white rounded-lg
                         font-semibold text-sm transition-all duration-300
                         shadow-lg hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Management Center
          </h2>
          <p className="text-gray-400">Quick access to manage your platform</p>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {managementCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className="group bg-gradient-to-br from-slate-800 to-slate-900
                           rounded-2xl border border-slate-700
                           shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Card Header */}
                <div className={`relative bg-gradient-to-r ${card.color} p-6`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/70">Total</p>
                      <p className="text-3xl font-bold text-white">
                        {card.stats}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {card.description}
                  </p>

                  {/* Actions */}
                  <div className="space-y-2">
                    {card.actions.map((action, idx) => {
                      const isView = action.toLowerCase().includes("view");
                      const isAdd = action.toLowerCase().includes("add");

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (isView) {
                              handleViewAll(card.id);
                            } else if (
                              isAdd ||
                              action.toLowerCase().includes("write")
                            ) {
                              handleAdd(card.id);
                            } else {
                              handleExtraAction(card.id, action);
                            }
                          }}
                          className="w-full flex items-center justify-between px-3 py-2
                                     bg-slate-800 hover:bg-slate-700 rounded-lg
                                     text-sm text-gray-300 hover:text-white
                                     border border-slate-700 hover:border-indigo-500/50
                                     transition-all duration-300"
                        >
                          <span>{action}</span>
                          {isView && <Eye className="w-4 h-4" />}
                          {isAdd && <Plus className="w-4 h-4" />}
                          {!isView && !isAdd && <Edit className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hover Bar */}
                <div className="h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="mt-12">
          <div
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl
                          border border-slate-700 shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => handleAdd("products")}
                className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700
                           rounded-xl border border-slate-700 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    New Product
                  </p>
                  <p className="text-xs text-gray-400">Add to catalog</p>
                </div>
              </button>

              <button
                onClick={() => handleAdd("articles")}
                className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700
                           rounded-xl border border-slate-700 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    New Article
                  </p>
                  <p className="text-xs text-gray-400">Write blog post</p>
                </div>
              </button>



              <button
                onClick={() => handleViewAll("users")}
                className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700
                           rounded-xl border border-slate-700 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    User Activity
                  </p>
                  <p className="text-xs text-gray-400">Monitor users</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

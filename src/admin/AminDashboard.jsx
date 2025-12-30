import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Package, 
  Layers, 
  FileText, 
  LogOut, 
  ShoppingBag,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  Activity
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  // Mock stats
  const stats = {
    totalUsers: 1234,
    totalProducts: 567,
    totalCategories: 12,
    totalArticles: 89,
    totalOrders: 3456,
    revenue: 45678.90
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Logout - navigate to /login");
    navigate("/login");
  };

  const handleCardClick = (cardName) => {
    setSelectedCard(cardName);
    console.log(`Navigate to ${cardName} management`);
    // In your app: navigate to specific admin page
  };

  const managementCards = [
    {
      id: 'users',
      title: 'Users',
      description: 'Manage registered users and permissions',
      icon: Users,
      color: 'from-blue-600 to-cyan-600',
      stats: stats.totalUsers,
      actions: ['View All', 'Add User', 'User Roles']
    },
    {
      id: 'products',
      title: 'Products',
      description: 'Add, edit, and manage products',
      icon: Package,
      color: 'from-purple-600 to-pink-600',
      stats: stats.totalProducts,
      actions: ['View All', 'Add Product', 'Bulk Import']
    },
    {
      id: 'categories',
      title: 'Categories',
      description: 'Organize and manage product categories',
      icon: Layers,
      color: 'from-green-600 to-emerald-600',
      stats: stats.totalCategories,
      actions: ['View All', 'Add Category', 'Reorder']
    },
    {
      id: 'articles',
      title: 'Articles',
      description: 'Create and manage blog articles',
      icon: FileText,
      color: 'from-orange-600 to-red-600',
      stats: stats.totalArticles,
      actions: ['View All', 'Write Article', 'Drafts']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 sm:p-3 rounded-xl shadow-lg shadow-indigo-900/50">
                <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Admin Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  Manage your e-commerce platform
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5
                       bg-red-600 hover:bg-red-700 text-white rounded-lg
                       font-semibold text-sm transition-all duration-300
                       shadow-lg shadow-red-900/50 hover:shadow-xl hover:shadow-red-900/70
                       transform hover:scale-105"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
          
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 sm:p-6
                        border border-slate-700 shadow-xl col-span-2 lg:col-span-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400 mb-1">Total Revenue</p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                  ${stats.revenue.toLocaleString()}
                </h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.5% from last month
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-600/20 
                            flex items-center justify-center">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 sm:p-6
                        border border-slate-700 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400 mb-1">Total Orders</p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                  {stats.totalOrders.toLocaleString()}
                </h3>
                <p className="text-xs text-blue-400 flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  Active now
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600/20 
                            flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 sm:p-6
                        border border-slate-700 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400 mb-1">Analytics</p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                  View Stats
                </h3>
                <p className="text-xs text-purple-400 flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  Detailed reports
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-600/20 
                            flex items-center justify-center">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Management Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Management Center
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Quick access to manage your platform
          </p>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {managementCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="group cursor-pointer bg-gradient-to-br from-slate-800 to-slate-900 
                         rounded-2xl border border-slate-700 hover:border-indigo-500/50
                         shadow-xl hover:shadow-2xl hover:shadow-indigo-900/30
                         transition-all duration-500 transform hover:scale-105 overflow-hidden"
              >
                {/* Card Header with Gradient */}
                <div className={`relative bg-gradient-to-r ${card.color} p-5 sm:p-6`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm
                                  flex items-center justify-center shadow-lg">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/70">Total</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {card.stats}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 
                               group-hover:text-indigo-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-4">
                    {card.description}
                  </p>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    {card.actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(`${action} - ${card.title}`);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2
                                 bg-slate-800 hover:bg-slate-700 rounded-lg
                                 text-xs sm:text-sm text-gray-300 hover:text-white
                                 border border-slate-700 hover:border-indigo-500/50
                                 transition-all duration-300 group/btn"
                      >
                        <span>{action}</span>
                        {idx === 0 && <Eye className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />}
                        {idx === 1 && <Plus className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />}
                        {idx === 2 && <Edit className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl
                        border border-slate-700 shadow-xl p-5 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              Quick Actions
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <button className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700
                               rounded-xl border border-slate-700 hover:border-indigo-500/50
                               transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-indigo-600/20 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    New Product
                  </p>
                  <p className="text-xs text-gray-400">Add to catalog</p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700
                               rounded-xl border border-slate-700 hover:border-green-500/50
                               transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white group-hover:text-green-300 transition-colors">
                    New Article
                  </p>
                  <p className="text-xs text-gray-400">Write blog post</p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700
                               rounded-xl border border-slate-700 hover:border-purple-500/50
                               transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                    View Reports
                  </p>
                  <p className="text-xs text-gray-400">Analytics data</p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700
                               rounded-xl border border-slate-700 hover:border-blue-500/50
                               transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
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
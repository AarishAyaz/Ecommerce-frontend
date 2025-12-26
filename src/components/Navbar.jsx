import { useState, useEffect } from "react";
import { Menu, X, LogOut, User, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Lazy initialization of userName from localStorage
  const [userName, setUserName] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return "";
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.name || "User";
    } catch {
      return "User";
    }
  });

  const isAuthenticated = !!localStorage.getItem("token");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update username dynamically if localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          setUserName(user?.name || "User");
        } catch {
          setUserName("User");
        }
      } else {
        setUserName("");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Scroll to a section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  // Navigate handler
  const handleNavigate = (path) => {
    console.log(`Navigating to ${path}`);
    navigate("/login");

    setOpen(false);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully 👋");

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 800);
  };
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-black/20"
          : "bg-slate-900/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNavigate("/")}
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1.5 sm:p-2 rounded-lg group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              Shop<span className="text-indigo-400">Hub</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {["home", "categories", "products", "articles", "contact"].map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="px-3 xl:px-4 py-2 text-sm xl:text-base font-medium text-gray-300 
                           hover:text-white hover:bg-slate-800 rounded-lg transition-all capitalize"
                  >
                    {item}
                  </button>
                </li>
              )
            )}

            {/* User Badge */}
            {isAuthenticated && (
              <li className="ml-2 xl:ml-4">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 px-3 xl:px-4 py-2 bg-slate-800 
               border border-slate-700 rounded-lg text-gray-200
               hover:bg-slate-700 hover:border-indigo-500
               transition-all cursor-pointer"
                >
                  <div className="bg-indigo-500 p-1 rounded-full">
                    <User className="w-3 h-3 xl:w-4 xl:h-4 text-white" />
                  </div>
                  <span className="font-medium text-sm xl:text-base">
                    {userName}
                  </span>
                </button>
              </li>
            )}

            {/* Logout Button */}
            {isAuthenticated && (
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 
                           hover:from-red-700 hover:to-red-800 text-white px-3 xl:px-4 py-2 
                           text-sm xl:text-base rounded-lg font-medium transition-all 
                           shadow-lg shadow-red-900/30 hover:shadow-red-900/50 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden xl:inline">Logout</span>
                </button>
              </li>
            )}

            {/* Login/Signup for non-authenticated */}
            {/* {!isAuthenticated && (
              <>
                <li>
                  <button
                    onClick={() => handleNavigate("/login")}
                    className="px-3 xl:px-4 py-2 text-sm xl:text-base font-medium text-gray-300 
                             hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("/signup")}
                    className="px-3 xl:px-4 py-2 text-sm xl:text-base font-medium 
                             bg-gradient-to-r from-blue-600 to-indigo-600 
                             hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg 
                             transition-all shadow-lg shadow-indigo-900/30"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}*/}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-300 hover:text-white transition-colors p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 shadow-xl">
          <ul className="px-4 py-4 space-y-2">
            {["home", "categories", "products", "articles", "contact"].map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="w-full text-left px-4 py-3 text-base font-medium text-gray-300 
                           hover:text-white hover:bg-slate-800 rounded-lg transition-all capitalize"
                  >
                    {item}
                  </button>
                </li>
              )
            )}

            {/* Mobile User Badge */}
            {isAuthenticated && (
              <li className="pt-2">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 
               border border-slate-700 rounded-lg
               hover:bg-slate-700 hover:border-indigo-500
               transition-all"
                >
                  <div className="bg-indigo-500 p-2 rounded-full">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-200">{userName}</span>
                </button>
              </li>
            )}

            {/* Mobile Logout */}
            {isAuthenticated && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 
                           bg-gradient-to-r from-red-600 to-red-700 text-white 
                           py-3 rounded-lg font-medium transition-all 
                           shadow-lg shadow-red-900/30"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </li>
            )}

            {/* Mobile Login/Signup */}
            {!isAuthenticated && (
              <li className="pt-2 space-y-2">
                <button
                  onClick={() => handleNavigate("/login")}
                  className="w-full px-4 py-3 text-base font-medium text-gray-300 
                           hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigate("/signup")}
                  className="w-full px-4 py-3 text-base font-medium 
                           bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                           rounded-lg transition-all shadow-lg shadow-indigo-900/30"
                >
                  Sign Up
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

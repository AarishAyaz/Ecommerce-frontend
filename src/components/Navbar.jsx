import { useState, useEffect } from "react";
import { Menu, X, LogOut, User, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // ✅ Single source of truth
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("auth"));
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!auth?.token;
  const userName = auth?.user?.name || "";

  /* ---------------- Scroll Effect ---------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Sync Auth ---------------- */
  useEffect(() => {
    const syncAuth = () => {
      try {
        setAuth(JSON.parse(localStorage.getItem("auth")));
      } catch {
        setAuth(null);
      }
    };

    window.addEventListener("storage", syncAuth);
    syncAuth();

    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  /* ---------------- Navigation ---------------- */
  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  /* ---------------- Logout ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);

    toast.success("Logged out successfully 👋");
    navigate("/login", { replace: true });
  };

  /* ---------------- Scroll To Section ---------------- */
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-lg shadow-lg"
          : "bg-slate-900/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigate("/")}
        >
          <div className="bg-indigo-600 p-2 rounded-lg">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">
            Shop<span className="text-indigo-400">Hub</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-2">
          {["home", "categories", "products", "articles", "contact"].map(
            (item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg capitalize"
                >
                  {item}
                </button>
              </li>
            )
          )}

          {/* User Info */}
          {isAuthenticated && (
            <>
              <li>
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-gray-200 hover:bg-slate-700"
                >
                  <User className="w-4 h-4" />
                  {userName}
                </button>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-4">
          <ul className="space-y-2">
            {["home", "categories", "products", "articles", "contact"].map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-slate-800 rounded-lg capitalize"
                  >
                    {item}
                  </button>
                </li>
              )
            )}

            {isAuthenticated && (
              <>
                <li>
                  <button
                    onClick={() => handleNavigate("/profile")}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-gray-200"
                  >
                    <User className="w-4 h-4" />
                    {userName}
                  </button>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 px-4 py-2 rounded-lg text-white"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

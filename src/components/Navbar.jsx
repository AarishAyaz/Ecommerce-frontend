import React, { useState, useEffect } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Ecommerce App
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-lg font-medium text-gray-700">
          <li className="cursor-pointer hover:text-blue-600" onClick={() => scrollToSection("home")}>Home</li>
          <li className="cursor-pointer hover:text-blue-600" onClick={() => scrollToSection("categories")}>Categories</li>
          <li className="cursor-pointer hover:text-blue-600" onClick={() => scrollToSection("products")}>Products</li>
          <li className="cursor-pointer hover:text-blue-600" onClick={() => scrollToSection("articles")}>Articles</li>
          <li className="cursor-pointer hover:text-blue-600" onClick={() => scrollToSection("contact")}>Contact</li>

          {/* Show username */}
          {isAuthenticated && (
            <li className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-gray-800">
              <User size={18} />
              <span className="font-medium">{userName}</span>
            </li>
          )}

          {/* Logout */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 text-md rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <ul className="md:hidden bg-white shadow-md py-4 space-y-4 text-center text-lg font-medium text-gray-700">
          <li onClick={() => scrollToSection("home")} className="cursor-pointer hover:text-blue-600">Home</li>
          <li onClick={() => scrollToSection("categories")} className="cursor-pointer hover:text-blue-600">Categories</li>
          <li onClick={() => scrollToSection("products")} className="cursor-pointer hover:text-blue-600">Products</li>
          <li onClick={() => scrollToSection("articles")} className="cursor-pointer hover:text-blue-600">Articles</li>
          <li onClick={() => scrollToSection("contact")} className="cursor-pointer hover:text-blue-600">Contact</li>

          {/* Mobile username */}
          {isAuthenticated && (
            <li className="flex items-center justify-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
              <User size={18} />
              <span className="font-medium">{userName}</span>
            </li>
          )}

          {/* Mobile logout */}
          {isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

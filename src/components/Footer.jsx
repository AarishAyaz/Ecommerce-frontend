import { ShoppingBag, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const handleNavigate = (path) => {
    console.log(`Navigate to ${path}`);
    // In your app: navigate(path)
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-black to-black border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Shop<span className="text-indigo-400">Hub</span>
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop destination for premium products. Quality, value, and customer satisfaction guaranteed.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => window.open('https://facebook.com', '_blank')}
                className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 
                         hover:bg-blue-600 hover:border-blue-600
                         flex items-center justify-center transition-all duration-300
                         hover:scale-110 group"
              >
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </button>
              <button 
                onClick={() => window.open('https://twitter.com', '_blank')}
                className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 
                         hover:bg-sky-500 hover:border-sky-500
                         flex items-center justify-center transition-all duration-300
                         hover:scale-110 group"
              >
                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </button>
              <button 
                onClick={() => window.open('https://instagram.com', '_blank')}
                className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 
                         hover:bg-pink-600 hover:border-pink-600
                         flex items-center justify-center transition-all duration-300
                         hover:scale-110 group"
              >
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </button>
              <button 
                onClick={() => window.open('https://linkedin.com', '_blank')}
                className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 
                         hover:bg-blue-700 hover:border-blue-700
                         flex items-center justify-center transition-all duration-300
                         hover:scale-110 group"
              >
                <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('categories')}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Categories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('articles')}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Articles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2.5">
              <li>
                <button 
                  onClick={() => handleNavigate('/about')}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/shipping')}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Shipping Info
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/returns')}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/faq')}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigate('/support')}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Support Center
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:aarishk623@gmail.com"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  aarishk623@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+923023739939"
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  +92 302 3739939
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  Mardan, Pakistan
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 
                           rounded-lg text-sm text-white placeholder:text-gray-500
                           focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                           transition-all"
                />
                <button
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 
                           hover:from-indigo-700 hover:to-purple-700
                           text-white text-sm font-semibold rounded-lg
                           transition-all duration-300 hover:scale-105
                           shadow-lg shadow-indigo-900/50"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} <span className="text-white font-semibold">ShopHub</span>. All rights reserved.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <button 
                onClick={() => handleNavigate('/privacy')}
                className="hover:text-indigo-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleNavigate('/terms')}
                className="hover:text-indigo-400 transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => handleNavigate('/cookies')}
                className="hover:text-indigo-400 transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>

          {/* Made with Love */}
          <div className="mt-4 pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-gray-500">
              Made with <span className="text-red-500">❤</span> by the ShopHub Team | Powered by Innovation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
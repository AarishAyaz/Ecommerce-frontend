import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-12 md:mb-16 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 backdrop-blur-md 
                      border border-indigo-400/30 rounded-full mb-4 sm:mb-6">
          <MessageCircle className="w-4 h-4 text-indigo-400" />
          <span className="text-indigo-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Get In Touch
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4
                     bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
          Contact Us
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
          Have questions or need assistance? Our team is here to help you 24/7
        </p>

        {/* Decorative Line */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
          <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent to-indigo-500"></div>
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent to-indigo-500"></div>
        </div>
      </div>



      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-start">

          {/* Left Side - Contact Info */}
          <div className="space-y-6 md:space-y-8 h-full flex flex-col">
            {/* Info Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8
                          border border-slate-700 shadow-xl h-full flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Let's Start a Conversation
              </h3>
              <p className="text-sm sm:text-base text-gray-400 mb-6">
                Whether you have a question about products, pricing, or anything else, 
                our team is ready to answer all your questions.
              </p>

              {/* Contact Items */}
              <div className="space-y-5 flex-grow">
                {/* Email */}
                <div className="group flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 
                              border border-slate-700 hover:border-indigo-500/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 
                                flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-900/50">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400 mb-1">Email Us</p>
                    <a href="mailto:aarishk623@gmail.com" 
                       className="text-sm sm:text-base text-white font-semibold hover:text-indigo-400 transition-colors">
                      aarishk623@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 
                              border border-slate-700 hover:border-indigo-500/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 
                                flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-900/50">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400 mb-1">Call Us</p>
                    <a href="tel:+923023739939" 
                       className="text-sm sm:text-base text-white font-semibold hover:text-green-400 transition-colors">
                      +92 302 3739939
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="group flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 
                              border border-slate-700 hover:border-indigo-500/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-pink-600 
                                flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-900/50">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400 mb-1">Visit Us</p>
                    <p className="text-sm sm:text-base text-white font-semibold">
                      Mardan, Pakistan
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="group flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 
                              border border-slate-700 hover:border-indigo-500/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 
                                flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/50">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400 mb-1">Business Hours</p>
                    <p className="text-sm sm:text-base text-white font-semibold">
                      24/7 Customer Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8
                        border border-slate-700 shadow-xl h-full flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Send us a Message
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6">
              Fill out the form below and we'll get back to you as soon as possible
            </p>

            {/* Success Message */}
            {isSuccess && (
              <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded-xl
                            flex items-center gap-3 animate-fade-in">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-400 text-sm font-semibold">
                  Message sent successfully! We'll be in touch soon.
                </p>
              </div>
            )}

            <div className="space-y-4 sm:space-y-5 flex-grow flex flex-col">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl
                           text-white placeholder:text-gray-400
                           focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 
                           transition-all duration-200"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl
                           text-white placeholder:text-gray-400
                           focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 
                           transition-all duration-200"
                />
              </div>

              {/* Message Textarea */}
              <div className="flex-grow flex flex-col">
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-xl
                           text-white placeholder:text-gray-400 resize-none flex-grow
                           focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 
                           transition-all duration-200"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 
                         hover:from-indigo-700 hover:to-purple-700
                         disabled:from-slate-600 disabled:to-slate-700
                         text-white py-3.5 sm:py-4 rounded-xl font-bold
                         flex items-center justify-center gap-2
                         shadow-lg shadow-indigo-900/50 hover:shadow-xl hover:shadow-indigo-900/70
                         transition-all duration-300 transform hover:scale-105
                         disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
            {/* Footer */}
      <footer className="relative z-10 mt-16 sm:mt-20 md:mt-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-base sm:text-lg">
                  Shop<span className="text-indigo-400">Hub</span>
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  © {new Date().getFullYear()} All rights reserved
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
              <button className="text-gray-400 hover:text-indigo-400 transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-indigo-400 transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-indigo-400 transition-colors">
                Support
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 
                               hover:bg-indigo-600 hover:border-indigo-600
                               flex items-center justify-center transition-all duration-300
                               hover:scale-110">
                <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 
                               hover:bg-indigo-600 hover:border-indigo-600
                               flex items-center justify-center transition-all duration-300
                               hover:scale-110">
                <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 
                               hover:bg-indigo-600 hover:border-indigo-600
                               flex items-center justify-center transition-all duration-300
                               hover:scale-110">
                <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Made with ❤️ by ShopHub Team | Powered by Innovation
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default ContactUs;
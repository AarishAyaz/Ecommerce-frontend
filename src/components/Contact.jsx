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
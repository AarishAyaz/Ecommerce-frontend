import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Electronics from '../assets/Electronics.jpeg'
import Fashion from '../assets/Fashion.jpeg'
import Furniture from '../assets/Furniture.jpeg'
const HeroSection = () => {
  // const slides = [Electronics, Fashion, Furniture];
    const slides = [
    {
      image: Electronics,
      title: "Premium Electronics",
      subtitle: "Latest Tech at Unbeatable Prices",
      category: "Electronics"
    },
    {
      image: Fashion,
      title: "Trending Fashion",
      subtitle: "Style That Defines You",
      category: "Fashion"
    },
    {
      image: Furniture,
      title: "Modern Furniture",
      subtitle: "Transform Your Living Space",
      category: "Furniture"
    }
  ];

  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToPrevious = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const handleShopNow = () => {
    const element = document.getElementById("products");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Images with Ken Burns Effect */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`w-full h-full bg-cover bg-center transform transition-transform duration-[20000ms] ${
              i === index ? "scale-110" : "scale-100"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
        </div>
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        
        {/* Category Badge */}
        <div className="mb-4 sm:mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 backdrop-blur-md 
                        border border-indigo-400/30 rounded-full">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-300 text-sm sm:text-base font-medium">
              {slides[index].category}
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 
                     font-bold text-white mb-4 sm:mb-6 leading-tight
                     drop-shadow-2xl animate-slide-up">
          {slides[index].title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 
                    text-gray-200 mb-6 sm:mb-8 md:mb-10
                    drop-shadow-xl max-w-3xl animate-slide-up-delay">
          {slides[index].subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-delay">
          <button
            onClick={handleShopNow}
            className="group px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5
                     bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                     hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700
                     text-white text-base sm:text-lg lg:text-xl font-bold rounded-full 
                     shadow-2xl shadow-indigo-900/50 hover:shadow-indigo-900/70
                     transition-all duration-300 transform hover:scale-105
                     flex items-center justify-center gap-2"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              const element = document.getElementById("categories");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5
                     bg-white/10 hover:bg-white/20 backdrop-blur-md
                     border-2 border-white/30 hover:border-white/50
                     text-white text-base sm:text-lg lg:text-xl font-semibold rounded-full 
                     transition-all duration-300 transform hover:scale-105"
          >
            Explore Categories
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 
                      animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2
                 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
                 bg-white/10 hover:bg-white/20 backdrop-blur-md
                 border border-white/20 hover:border-white/40
                 rounded-full flex items-center justify-center
                 transition-all duration-300 group
                 hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2
                 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
                 bg-white/10 hover:bg-white/20 backdrop-blur-md
                 border border-white/20 hover:border-white/40
                 rounded-full flex items-center justify-center
                 transition-all duration-300 group
                 hover:scale-110"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 
                    flex gap-2 sm:gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              setIsAutoPlaying(false);
            }}
            className={`transition-all duration-300 rounded-full
              ${i === index 
                ? "w-8 sm:w-10 h-2 sm:h-2.5 bg-white" 
                : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/60"
              }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes scroll {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.4s backwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.2s backwards;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
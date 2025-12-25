import { BookOpen, ArrowRight, Clock, Sparkles } from "lucide-react";

// ArticleCard Component
const ArticleCard = ({ title, description, image, onReadMore }) => {
  return (
    <div
      className="group cursor-pointer bg-gradient-to-br from-slate-800 to-slate-900 
               rounded-xl sm:rounded-2xl overflow-hidden
               border border-slate-700 hover:border-indigo-500/50
               shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-indigo-900/30
               transition-all duration-500 transform hover:scale-[1.02]"
      onClick={onReadMore}
    >
      {/* Article Image */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-slate-900">
        <img
          src={image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <div className="bg-indigo-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-bold text-white">Tech Guide</span>
          </div>
        </div>

        {/* Read Time Badge */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-xs font-semibold text-gray-300">5 min</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white 
                     leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-2 sm:mt-3 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Read More Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReadMore();
          }}
          className="mt-4 sm:mt-5 inline-flex items-center gap-2 
                   text-xs sm:text-sm md:text-base font-bold
                   text-indigo-400 hover:text-indigo-300
                   group/btn transition-all duration-300"
        >
          <span>Read Full Article</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
export default ArticleCard;
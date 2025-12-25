import { ArrowRight, Zap } from "lucide-react";

// CategoryCard Component
const CategoryCard = ({ image, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative rounded-2xl overflow-hidden 
               bg-slate-800 border border-slate-700 hover:border-indigo-500/50
               shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-indigo-900/30
               transition-all duration-500 transform hover:scale-105"
    >
      {/* Image */}
      <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 
                   transition-transform duration-700 ease-out"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                      group-hover:from-black/90 transition-all duration-500"></div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                      bg-gradient-to-tr from-transparent via-white/10 to-transparent 
                      transform -translate-x-full group-hover:translate-x-full 
                      transition-all duration-1000"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white 
                       drop-shadow-2xl group-hover:text-indigo-300 transition-colors">
            {title}
          </h3>
          
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full 
                        bg-indigo-600 group-hover:bg-indigo-500
                        flex items-center justify-center
                        shadow-lg shadow-indigo-900/50
                        transform group-hover:translate-x-1 transition-all">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>
        
        {/* Shop Now Text */}
        <p className="text-xs sm:text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 
                    transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Explore Collection →
        </p>
      </div>

      {/* Corner Badge */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
        <div className="bg-indigo-600/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 
                      rounded-full flex items-center gap-1 sm:gap-1.5
                      opacity-0 group-hover:opacity-100 
                      transform scale-75 group-hover:scale-100 transition-all duration-300">
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
          <span className="text-xs sm:text-sm font-bold text-white">New</span>
        </div>
      </div>
    </div>
  );
};
export default CategoryCard;
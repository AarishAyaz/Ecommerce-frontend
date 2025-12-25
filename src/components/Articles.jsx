import ArticleCard from "./ArticleCard";
import { BookOpen, ArrowRight, Clock, Sparkles } from "lucide-react";

const ArticlesSection = () => {
  const articles = [
    {
      title: "Top 10 Gadgets You Need in 2025",
      description:
        "Technology is evolving fast. These 10 gadgets will improve your daily life with efficiency, comfort, and style. From smart home devices to cutting-edge wearables, discover the innovations that will transform how you work and play.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80",
    },
    {
      title: "How to Choose the Best Laptop",
      description:
        "Buying a laptop can be confusing, but this guide covers everything from RAM and processors to display quality. Learn about the key specifications that matter, understand the difference between gaming and productivity laptops, and find the perfect match for your needs.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    },
    {
      title: "Smart Home Revolution: What's Next?",
      description:
        "Explore the latest trends in smart home technology and how IoT devices are transforming our living spaces. From voice-controlled assistants to automated security systems, see how technology is making homes safer, more efficient, and incredibly convenient.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    },
  ];

  const handleReadMore = (title) => {
    console.log(`Reading article: ${title}`);
    // In your app: navigate to article detail page
  };

  return (
    <section id="articles" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-black via-slate-900 to-black">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 
                      bg-blue-600/20 backdrop-blur-md 
                      border border-blue-400/30 rounded-full mb-3 sm:mb-4">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
          <span className="text-blue-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Knowledge Hub
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                     font-bold text-white mb-2 sm:mb-3 md:mb-4
                     bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
          Latest Articles & Guides
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto">
          Stay updated with the latest trends, expert tips, and comprehensive reviews
        </p>

        {/* Decorative Line */}
        <div className="mt-4 sm:mt-6 md:mt-8 flex items-center justify-center gap-2">
          <div className="h-px w-10 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-r from-transparent to-blue-500"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div className="h-px w-10 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-l from-transparent to-blue-500"></div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {articles.map((article, idx) => (
            <ArticleCard
              key={idx}
              title={article.title}
              description={article.description}
              image={article.image}
              onReadMore={() => handleReadMore(article.title)}
            />
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16">
        <button
          className="group inline-flex items-center gap-2 
                   px-5 sm:px-6 md:px-8 lg:px-10 
                   py-2.5 sm:py-3 md:py-3.5 lg:py-4
                   bg-gradient-to-r from-blue-600 to-indigo-600 
                   hover:from-blue-700 hover:to-indigo-700
                   text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold rounded-full
                   shadow-xl shadow-blue-900/50 hover:shadow-2xl hover:shadow-blue-900/70
                   transition-all duration-300 transform hover:scale-105"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default ArticlesSection;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Home, 
  ChevronRight,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  AlertCircle,
  BookOpen
} from "lucide-react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BASE_URL}/api/articles/${id}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch article");
        }
        
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
        const errorMessage = err.message || "Unable to load article";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [id]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetch(`${BASE_URL}/api/articles/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch article");
        return res.json();
      })
      .then(data => setArticle(data))
      .catch(err => {
        console.error(err);
        const errorMessage = err.message || "Unable to load article";
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => setLoading(false));
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(/\s+/).length || 0;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || "Check out this article";
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
    setShowShareMenu(false);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        {/* Breadcrumb Skeleton */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="h-6 w-64 bg-slate-800/50 rounded animate-pulse mb-8" />
        </div>

        {/* Article Skeleton */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-slate-800/50 rounded-2xl overflow-hidden">
            {/* Image Skeleton */}
            <div className="aspect-video bg-slate-700/50 animate-pulse" />
            
            {/* Content Skeleton */}
            <div className="p-8 space-y-6">
              <div className="flex gap-4">
                <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse" />
                <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse" />
              </div>
              <div className="h-10 bg-slate-700/50 rounded animate-pulse w-3/4" />
              <div className="space-y-3">
                <div className="h-4 bg-slate-700/50 rounded animate-pulse" />
                <div className="h-4 bg-slate-700/50 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-slate-700/50 rounded animate-pulse w-4/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              {error ? "Oops! Something went wrong" : "Article Not Found"}
            </h2>
            
            <p className="text-gray-400 mb-8 text-lg">
              {error || "The article you're looking for doesn't exist or has been removed."}
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              {error && (
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-8 py-4
                           bg-gradient-to-r from-blue-600 to-indigo-600 
                           hover:from-blue-500 hover:to-indigo-500
                           text-white font-semibold rounded-full 
                           shadow-lg hover:shadow-xl
                           transform hover:scale-105
                           transition-all duration-200"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={() => navigate("/articles")}
                className="inline-flex items-center gap-2 px-8 py-4
                         bg-slate-800/50 border border-slate-700/50
                         hover:bg-slate-700/50
                         text-white font-semibold rounded-full 
                         transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Articles
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(article.content);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="pt-8 pb-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <button
              onClick={() => navigate("/articles")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Articles
            </button>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>
        </div>

        {/* Article Container */}
        <div className="py-8 pb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
            {/* Article Image */}
            {article.image && (
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={`${BASE_URL}${article.image}`}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60" />
              </div>
            )}

            {/* Article Content */}
            <div className="p-6 sm:p-8 lg:p-12">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                {article.category && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 border border-blue-400/30 rounded-full">
                    <Tag className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 font-medium">{article.category}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{readingTime} min read</span>
                </div>

                {article.createdAt && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Author */}
              {article.author && (
                <div className="flex items-center gap-3 mb-8 pb-8 border-b border-slate-700/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{article.author}</p>
                    <p className="text-gray-400 text-sm">Author</p>
                  </div>
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-invert prose-lg max-w-none mb-8">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {article.content}
                </p>
              </div>

              {/* Share Section */}
              <div className="pt-8 border-t border-slate-700/50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <p className="text-gray-400 font-medium">Share this article:</p>
                  
                  <div className="flex items-center gap-3 relative">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-10 h-10 flex items-center justify-center rounded-full
                               bg-slate-700/50 hover:bg-blue-600/20 border border-slate-600/50 hover:border-blue-500/50
                               text-gray-400 hover:text-blue-400
                               transition-all duration-200"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-10 h-10 flex items-center justify-center rounded-full
                               bg-slate-700/50 hover:bg-sky-600/20 border border-slate-600/50 hover:border-sky-500/50
                               text-gray-400 hover:text-sky-400
                               transition-all duration-200"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-10 h-10 flex items-center justify-center rounded-full
                               bg-slate-700/50 hover:bg-blue-700/20 border border-slate-600/50 hover:border-blue-600/50
                               text-gray-400 hover:text-blue-500
                               transition-all duration-200"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>

                    <button
                      onClick={copyLink}
                      className="px-4 py-2 flex items-center gap-2 rounded-full
                               bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50
                               text-gray-400 hover:text-white
                               transition-all duration-200"
                      aria-label="Copy link"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Copy Link</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-8 pt-8 border-t border-slate-700/50">
                <button
                  onClick={() => navigate("/articles")}
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                  <span>Back to Articles</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetailPage;